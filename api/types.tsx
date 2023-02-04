export type FixtureTeam = {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
};

export type Fixture = {
  fixture: {
    id: number;
    referee: string;
    timezone: string;
    date: Date;
    timestamp: number;
    periods: {
      first: number;
      second: number;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: FixtureTeam;
    away: FixtureTeam;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
};

export type StandingData = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
};

export type Standing = {
  league: {
    id: number;
    standings: Array<StandingData[]>;
    season: number;
  };
};

export type Season = {
  year: number;
}

export type LeagueData = {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: Country;
  seasons: Season[];
};

export type Venue = {
  id: number | null;
  name: string;
  address: string | null;
  city: string | null;
  capacity: number | null;
  image: string | null;
};

export type Country = {
  name: string;
  code: string;
  flag: string;
};

export type Prediction = {
  predictions: {
    winner: {
      id: number;
      name: string;
      comment: string;
    };
    win_or_draw: boolean;
    under_or_over: number;
    goals: {
      home: number;
      away: number;
    };
    advice: string;
    percent: {
      home: number;
      away: number;
      draw: number;
    };
  };
  comparison: {
    form: {
      home: number;
      away: number;
    };
    att: {
      home: number;
      away: number;
    };
    def: {
      home: number;
      away: number;
    };
    poisson_distribution: {
      home: number;
      away: number;
    };
    h2h: {
      home: number;
      away: number;
    };
    goals: {
      home: number;
      away: number;
    };
    total: {
      home: number;
      away: number;
    };
  };
};