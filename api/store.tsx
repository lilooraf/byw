import { Prisma } from '@prisma/client';
import { BywCustom } from '../bywAlgo/process';
import prisma from '../lib/prisma';
import { BetApi, BookmakerApi, OddApi, OddBetApi } from './fetch';
import { getFromDBLeagueById } from './getFromDB';
import { Country, Fixture, LeagueData, Standing, Season, StandingData, Prediction } from './types';

export const storeStandings = async (standingsData: Standing[]) => {
  if (!standingsData) return;
  let error = false;

  for (const data of standingsData) {
    getFromDBLeagueById(data.league.id).then(async (league: LeagueData) => {
      for (const standingsData of data.league.standings) {
        for (const standing of standingsData) {
          await prisma.standing
            .findFirstOrThrow({
              where: {
                Team: {
                  name: standing.team.name,
                },
                leagueId: data.league.id,
                Season: {
                  year: data.league.season,
                },
              },
              select: {
                id: true,
              },
            })
            .then((sdelete) => {
              if (sdelete.id) {
                prisma.standing.delete({
                  where: {
                    id: sdelete.id,
                  },
                });
              }
            })
            .catch((error) => {
              console.log('deleteOldStanding - ', error);
            });

          if (standing.team.id) {
            prisma.standing
              .create({
                data: {
                  rank: standing.rank,
                  goalsDiff: standing.goalsDiff,
                  points: standing.points,
                  Season: {
                    connectOrCreate: {
                      where: {
                        year: data.league.season,
                      },
                      create: {
                        year: data.league.season,
                        Leagues: {
                          connect: {
                            id: data.league.id,
                          },
                        },
                      },
                    },
                  },
                  League: {
                    connectOrCreate: {
                      where: {
                        id: data.league.id,
                      },
                      create: {
                        id: league.league.id,
                        logo: league.league.logo,
                        name: league.league.name,
                        type: league.league.type,
                        Country: {
                          connectOrCreate: {
                            where: {
                              code: league.country.code,
                            },
                            create: {
                              code: league.country.code,
                              flag: league.country.flag,
                              name: league.country.name,
                            },
                          },
                        },
                      },
                    },
                  },
                  Team: {
                    connect: {
                      id: standing.team.id,
                    },
                  },
                  score: {
                    all: standing.all,
                    home: standing.home,
                    away: standing.away,
                  },
                },
              })
              .catch((err) => {
                console.log('storeStandings - connet to Team by id', err);
                error = true;
              });
          } else {
            prisma.team
              .findFirstOrThrow({
                where: {
                  name: {
                    equals: standing.team.name,
                    mode: 'insensitive',
                  },
                },
                select: {
                  id: true,
                },
              })
              .then((team) => {
                prisma.standing
                  .create({
                    data: {
                      rank: standing.rank,
                      goalsDiff: standing.goalsDiff,
                      points: standing.points,
                      Season: {
                        connectOrCreate: {
                          where: {
                            year: data.league.season,
                          },
                          create: {
                            year: data.league.season,
                            Leagues: {
                              connect: {
                                id: data.league.id,
                              },
                            },
                          },
                        },
                      },
                      League: {
                        connectOrCreate: {
                          where: {
                            id: data.league.id,
                          },
                          create: {
                            id: league.league.id,
                            logo: league.league.logo,
                            name: league.league.name,
                            type: league.league.type,
                            Country: {
                              connectOrCreate: {
                                where: {
                                  code: league.country.code,
                                },
                                create: {
                                  code: league.country.code,
                                  flag: league.country.flag,
                                  name: league.country.name,
                                },
                              },
                            },
                          },
                        },
                      },
                      Team: {
                        connect: {
                          id: team.id,
                        },
                      },
                      score: {
                        all: standing.all,
                        home: standing.home,
                        away: standing.away,
                      },
                    },
                  })
                  .catch((err) => {
                    console.error('storeStandings - connet to Team by name', err);
                    console.log(standing);
                  });
              })
              .catch(() => {
                if (error) {
                  console.error(
                    'Team not found to connect to standing',
                    standing.team.name,
                    standing.team.id
                  );
                }
              });
          }
        }
      }
    });
  }
};

export const storeFixture = async (fixture: Fixture) => {
  await prisma.fixture.upsert({
    where: {
      id: fixture.fixture.id,
    },
    create: {
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      winnerHome: hasWin(fixture.score, true),
      winnerAway: hasWin(fixture.score, false),
      homeScore: finalScore(fixture.score, true),
      awayScore: finalScore(fixture.score, false),
      timestamp: fixture.fixture.timestamp,
      timezone: fixture.fixture.timezone,
      status_: fixture.fixture.status.short,
      score: fixture.score,
      Teams: {
        connectOrCreate: [
          {
            where: {
              id: fixture.teams.home.id,
            },
            create: {
              id: fixture.teams.home.id,
              logo: fixture.teams.home.logo,
              name: fixture.teams.home.name,
              League: {
                connect: {
                  id: fixture.league.id,
                },
              },
            },
          },
          {
            where: {
              id: fixture.teams.away.id,
            },
            create: {
              id: fixture.teams.away.id,
              logo: fixture.teams.away.logo,
              name: fixture.teams.away.name,
              League: {
                connect: {
                  id: fixture.league.id,
                },
              },
            },
          },
        ],
      },
      TeamHome: {
        connectOrCreate: {
          where: {
            id: fixture.teams.home.id,
          },
          create: {
            id: fixture.teams.home.id,
            logo: fixture.teams.home.logo,
            name: fixture.teams.home.name,
            League: {
              connect: {
                id: fixture.league.id,
              },
            },
          },
        },
      },
      TeamAway: {
        connectOrCreate: {
          where: {
            id: fixture.teams.away.id,
          },
          create: {
            id: fixture.teams.away.id,
            logo: fixture.teams.away.logo,
            name: fixture.teams.away.name,
            League: {
              connect: {
                id: fixture.league.id,
              },
            },
          },
        },
      },
      Season: {
        connectOrCreate: {
          where: {
            year: fixture.league.season,
          },
          create: {
            year: fixture.league.season,
            Leagues: {
              connect: {
                id: fixture.league.id,
              },
            },
          },
        },
      },
      League: {
        connect: {
          id: fixture.league.id,
        },
      },
    },
    update: {
      winnerAway: fixture.teams.away.winner,
      winnerHome: fixture.teams.home.winner,
      score: fixture.score,
    },
  }).catch((err) => {
    console.error('storeFixture', err);
  });

  // return await prisma
  //   .$transaction([res])
  //   .then((res) => {
  //     // console.log(res);
  //     // console.log("Fixture " + fixture.fixture.id + " succesfully stored.");
  //   })
  //   .catch((err) => {
  //     // if (err.code != "P2002") {
  //     //   console.log(err);
  //     //   console.log(fixture);
  //     // }
  //   });
};

export const storeCountry = async (country: Country) => {
  await prisma.country
    .upsert({
      where: {
        code: country.code,
      },
      create: {
        name: country.name,
        code: country.code,
        flag: country.flag,
      },
      update: {
        flag: country.flag,
      },
    })
    .catch((err) => {
      console.error('storeCountry', err);
    });
};

export const storeLeague = async (league: LeagueData) => {
  await storeCountry(league.country);

  await prisma.league.upsert({
    create: {
      id: league.league.id,
      logo: league.league.logo,
      name: league.league.name,
      type: league.league.type,
      Country: {
        connect: {
          code: league.country.code,
        },
      },
    },
    update: {
      logo: league.league.logo,
      name: league.league.name,
      type: league.league.type,
      Country: {
        connect: {
          code: league.country.code,
        },
      },
    },
    where: {
      id: league.league.id,
    },
  }).catch((err) => {
    console.error('storeLeague', err);
  });

  for (const season of league.seasons) {
    await storeSeason(season, league.league.id);
  }
};

export const storeSeason = async (season: Season, leagueID: number) => {
  await prisma.season
    .upsert({
      create: {
        year: season.year,
        Leagues: {
          connect: {
            id: leagueID,
          },
        },
      },
      update: {
        year: season.year,
        Leagues: {
          connect: {
            id: leagueID,
          },
        },
      },
      where: {
        year: season.year,
      },
    })
    .catch((err) => {
      console.error('storeSeason', err);
    });
};

export const addOrUpdateBywFixtureById = async (
  fixtureID: number,
  byw: BywCustom
) => {
  await prisma.fixture.update({
    where: {
      id: fixtureID,
    },
    data: {
      Byw: {
        upsert: {
          create: {
            domExtPerf: byw.domExtPerf,
            domExtRank: byw.domExtRank,
            indice: byw.indice,
            perf: byw.perf,
            rank: byw.rank,
          },
          update: {
            domExtPerf: byw.domExtPerf,
            domExtRank: byw.domExtRank,
            indice: byw.indice,
            perf: byw.perf,
            rank: byw.rank,
          },
        },
      },
    },
  });
};

const hasWin = (score: Prisma.JsonValue, home: boolean): boolean | null => {
  var homePoint = false;
  var awayPoint = false;
  const moments = ['penalty', 'extratime', 'fulltime', 'halftime'];

  moments.forEach((moment: string) => {
    if (!homePoint && !awayPoint && score[moment].home != null) {
      if (score[moment].home > score[moment].away) homePoint = true;
      if (score[moment].home < score[moment].away) awayPoint = true;
      if (score[moment].home === score[moment].away) {
        homePoint = false;
        awayPoint = false;
      }
    }
  });
  return home ? homePoint : awayPoint;
};

const finalScore = (score: Prisma.JsonValue, home: boolean): number => {
  var homePoint = 0;
  var awayPoint = 0;
  const moments = ['penalty', 'extratime', 'fulltime', 'halftime'];

  moments.forEach((moment: string) => {
    if (!homePoint && !awayPoint && score[moment].home != null) {
      homePoint = score[moment].home;
      awayPoint = score[moment].away;
    }
  });
  return home ? homePoint : awayPoint;
};

export const storeOddBetApi = async (oddBetApi: OddBetApi) => {

  for (const bookmaker of oddBetApi.bookmakers) {
    await storeBookmaker(bookmaker);
    console.log(`fixture: ${oddBetApi.fixture.id} - bookmaker ${bookmaker.name} stored`);
    
    await storeBets(bookmaker.bets, bookmaker.id, oddBetApi.fixture.id);
  };
};

export const storeBets = async (bets: BetApi[], bookmakerId: number, fixtureId: number) => {
  bets.forEach(async (bet) => {
    await storeBet(bet, bookmakerId, fixtureId);
  });
};

export const storeBet = async (bet: BetApi, bookmakerId: number, fixtureId: number) => {
  
  let odd_ = [];

  bet.values.forEach((odd) => {
    odd_.push({
      value: odd.odd,
      type: odd.value.toString(),
    });
  });
  await prisma.bet.create({
    data: {
      name: bet.name,
      Bookmaker: {
        connect: {
          id: bookmakerId,
        },
      },
      Odds: {
        createMany: {
          data: odd_,
        },
      },
      Fixture: {
        connect: {
          id: fixtureId,
        },
      },
    },
  });
};

export const storeBookmaker = async (bookmaker: BookmakerApi) => {
  await prisma.bookmaker.upsert({
    where: {
      id: bookmaker.id,
    },
    create: {
      id: bookmaker.id,
      name: bookmaker.name,
    },
    update: {
      id: bookmaker.id,
      name: bookmaker.name,
    },
  });
};

export const storePrediction = async (prediction: Prediction, id: number) => {
  await prisma.prediction.upsert({
    where: {
      fixtureId: id,
    },
    create: {
      predictions: prediction.predictions,
      comparison: prediction.comparison,
      Fixture: {
        connect: {
          id: id,
        },
      },
    },
    update: {
      predictions: prediction.predictions,
      comparison: prediction.comparison,
    },
  });
}