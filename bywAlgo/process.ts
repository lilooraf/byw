import { Fixture, Prisma } from '@prisma/client';
import { getLastFixturesByTeamId } from '../api/getFromDB';
import { addOrUpdateBywFixtureById } from '../api/store';

type FixtureCustom = {
  id: number;
  TeamHome: {
    id: number;
  };
  score: Prisma.JsonValue;
};

type Performance = {
  win: number;
  loss: number;
  draw: number;
};

export type BywCustom = {
  indice: number;
  rank: number;
  perf: number;
  domExtRank: number;
  domExtPerf: number;
};

const bywAlgoInfo = {
  lastFixtures: {
    weight: 30,
    parts: [
      {
        weight: 5,
        numberFixture: 20,
        rankWeight: 2.5,
        performanceWeight: 2.5,
      },
      {
        weight: 10,
        numberFixture: 10,
        rankWeight: 5,
        performanceWeight: 5,
      },
      {
        weight: 15,
        numberFixture: 5,
        rankWeight: 7.5,
        performanceWeight: 7.5,
      },
    ],
  },
  lastDomExtFixtures: {
    weight: 45,
    parts: [
      {
        weight: 7,
        numberFixture: 20,
        rankWeight: 3.5,
        performanceWeight: 3.5,
      },
      {
        weight: 13,
        numberFixture: 10,
        rankWeight: 6.5,
        performanceWeight: 6.5,
      },
      {
        weight: 25,
        numberFixture: 5,
        rankWeight: 12.5,
        performanceWeight: 12.5,
      },
    ],
  },
  lastHeadToHead: {},
  info: {
    rank: {
      draw: 1,
      win: 3,
      loss: 0,
    },
  },
};

export const bywAlgoFixture = async (fixture: Fixture) => {
  const teamHomeId = fixture.teamHomeId;
  const teamAwayId = fixture.teamAwayId;
  let homeFixtures: FixtureCustom[] = [];
  let awayFixtures: FixtureCustom[] = [];

  // TODO: get fixtures before fixture date

  try {
    homeFixtures = await getLastFixturesByTeamId(teamHomeId, 100, [
      'FT',
      'AET',
      'PEN',
    ]);
    awayFixtures = await getLastFixturesByTeamId(teamAwayId, 100, [
      'FT',
      'AET',
      'PEN',
    ]);
  } catch (e) {
    throw e;
  }

  var rank = 0;
  var perf = 0;
  var domextrank = 0;
  var domextperf = 0;

  // Last fixtures
  bywAlgoInfo.lastFixtures.parts.forEach((part) => {
    rank += diffInRangeOfWeight(
      ranking(teamHomeId, homeFixtures, part.numberFixture),
      ranking(teamAwayId, awayFixtures, part.numberFixture),
      part.rankWeight
    );
    perf += managePerformance(
      performance(teamHomeId, homeFixtures, part.numberFixture),
      performance(teamAwayId, awayFixtures, part.numberFixture),
      part.performanceWeight
    );
  });

  let homeDomFixtures = getDomExtFixtures(homeFixtures, teamHomeId, true);
  let awayExtFixtures = getDomExtFixtures(awayFixtures, teamAwayId, false);

  // Last Dom Ext Fixtures
  bywAlgoInfo.lastDomExtFixtures.parts.forEach((part) => {
    domextrank += diffInRangeOfWeight(
      ranking(teamHomeId, homeDomFixtures, part.numberFixture),
      ranking(teamAwayId, awayExtFixtures, part.numberFixture),
      part.rankWeight
    );
    domextperf += managePerformance(
      performance(teamHomeId, homeDomFixtures, part.numberFixture),
      performance(teamAwayId, awayExtFixtures, part.numberFixture),
      part.performanceWeight
    );
  });

  let result = (domextrank + domextperf + rank + perf) * (1 / 3 + 1);

  // TODO: Head To Head

  if (!result) console.log('result:', result);
  if (!rank) console.log('rank:', rank);
  if (!perf) console.log('perf: ', perf);
  if (!domextrank) console.log('domextrank:', domextrank);
  if (!domextperf) console.log('domextperf:', domextperf);

  if (!result) {
    throw (
      'Error in BywAlgo bywAlgoFixture fixtureId:' +
      fixture.id +
      ' homeFixturesLength: ' +
      homeFixtures.length +
      ' awayFixturesLength: ' +
      awayFixtures.length +
      ' homeDomFixturesLength: ' +
      homeDomFixtures.length +
      ' awayExtFixturesLength: ' +
      awayExtFixtures.length
    );
  }

  const byw: BywCustom = {
    indice: result,
    rank: rank,
    perf: perf,
    domExtRank: domextrank,
    domExtPerf: domextperf,
  };

  addOrUpdateBywFixtureById(fixture.id, byw);
};

const getDomExtFixtures = (
  fixtures: FixtureCustom[],
  id: number,
  dom: boolean
) => {
  var res = [];

  fixtures.forEach((fixture: FixtureCustom) => {
    if (isHome(id, fixture) === dom) {
      res.push(fixture);
    }
  });
  return res;
};

const diffInRangeOfWeight = (
  r1: number,
  r2: number,
  weight: number
): number => {
  let r = r1 / r2 - 1;

  if (r > 1) {
    return weight;
  }
  if (r < -0.5) {
    return 0;
  }

  if (r < 0 && r >= -0.5) {
    r = r * 2;
  }

  r = r * (weight / 2) + weight / 2;

  return r;
};

const ranking = (id: number, data: FixtureCustom[], number: number): number => {
  let r = 0;

  // Get only the "number" of fixture
  const fixtures = data.slice(0, number);

  fixtures.forEach((fixture) => {
    r += getPoints(fixture.score, isHome(id, fixture));
  });
  return r;
};

const managePerformance = (
  p1: Performance,
  p2: Performance,
  weight: number
): number => {
  let r: Performance = {
    win: 0,
    loss: 0,
    draw: 0,
  };

  // Compare win
  r.win = diffInRangeOfWeight(p1.win, p2.win, weight);

  // Compare draw
  r.loss = diffInRangeOfWeight(p2.loss, p1.loss, weight);

  return (r.win + r.loss) / 2;
};

const performance = (id, data: FixtureCustom[], number): Performance => {
  let r: Performance = {
    win: 0,
    loss: 0,
    draw: 0,
  };

  // Get only the "number" of fixture
  const fixtures: FixtureCustom[] = data.slice(0, number);

  fixtures.forEach((fixture: FixtureCustom) => {
    let points = getPoints(fixture.score, isHome(id, fixture));
    if (points === bywAlgoInfo.info.rank.win) r.win += 1;
    if (points === bywAlgoInfo.info.rank.loss) r.loss += 1;
    if (points === bywAlgoInfo.info.rank.draw) r.draw += 1;
  });
  return r;
};

const isHome = (id: number, fixture: FixtureCustom): boolean => {
  return fixture.TeamHome.id === id ? true : false;
};

const getPoints = (score: Prisma.JsonValue, home: boolean): number => {
  var homePoint = bywAlgoInfo.info.rank.loss;
  var awayPoint = bywAlgoInfo.info.rank.loss;
  const moments = ['penalty', 'extratime', 'fulltime', 'halftime'];

  moments.forEach((moment) => {
    if (!homePoint && !awayPoint && score[moment].home != null) {
      if (score[moment].home > score[moment].away)
        homePoint = bywAlgoInfo.info.rank.win;
      if (score[moment].home < score[moment].away)
        awayPoint = bywAlgoInfo.info.rank.win;
      if (score[moment].home === score[moment].away) {
        homePoint = bywAlgoInfo.info.rank.draw;
        awayPoint = bywAlgoInfo.info.rank.draw;
      }
    }
  });

  if (!homePoint && !awayPoint) {
    // eslint-disable-next-line no-throw-literal
    throw 'Error the fixture have null scores at every moment';
  }
  return home ? homePoint : awayPoint;
};
