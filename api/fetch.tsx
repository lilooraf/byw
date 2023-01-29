import { Bet, Bookmaker, Odd, prisma } from '@prisma/client';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { Fixture, LeagueData, Standing, Venue, Country } from './types';

type LeagueApi = {
  id: number;
};

type FixtureApi = {
  id: number;
};

export type BookmakerApi = {
  id: number;
  name: string;
  bets: BetApi[];
};

export type BetApi = {
  id: number;
  name: string;
  values: OddApi[];
};

export type OddApi = {
  value: string;
  odd: string;
};

export type OddBetApi = {
  league: LeagueApi;
  fixture: FixtureApi;
  bookmakers: BookmakerApi[];
};

let http = rateLimit(axios.create(), {
  maxRequests: 5,
  maxRPS: 5,
});

export const fetchNextFixtures = async (number: number): Promise<Fixture[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/fixtures',
    params: { next: number },
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  };

  return await http
    .request(options)
    .then((response) => {
      return response.data.response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchH2h = async (
  home: number,
  away: number,
  number: number
): Promise<Fixture[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/fixtures/headtohead',
    params: {
      h2h: home + '-' + away,
      last: number,
      timezone: 'Europe/Paris',
      // status: "FT-AET-PEN",
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then((response) => {
      return response.data.response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchFixturesByLeagueIdAndSeason = async (
  leagueId: number,
  season: number
): Promise<Fixture[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/fixtures',
    params: {
      league: leagueId,
      season: season,
      timezone: 'Europe/Paris',
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then((response) => {
      return response.data.response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchLeagues = async (): Promise<LeagueData[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/leagues',
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  };

  return await http
    .request(options)
    .then((response) => {
      response.data.response.forEach((league: LeagueData) => {
        if (league.country.name == 'World') {
          league.country.code = 'WORLD';
          league.country.flag =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1599px-International_Flag_of_Planet_Earth.svg.png';
        }
      });

      return response.data.response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchLeagueById = async (id: number): Promise<LeagueData> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/leagues',
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then((response) => {
      let league = response.data.response[0];

      if (league.country.name == 'World') {
        league.country.code = 'WORLD';
        league.country.flag =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1599px-International_Flag_of_Planet_Earth.svg.png';
      }
      return league;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchStandingByTeamId = async (
  id: number,
  year: string
): Promise<Standing[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/standings',
    params: { team: id, season: year },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchStandingsByLeagueId = async (
  id: number,
  year: string
): Promise<Standing[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/standings',
    params: { league: id, season: year },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchVenueById = async (id: number): Promise<Venue> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/venues',
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response[0];
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getLastFixturesByTeam = async (
  id: number,
  last: number
): Promise<Fixture[]> => {
  var options = {
    method: 'GET',
    url: process.env.API_URL + '/fixtures',
    params: {
      team: id,
      last: last,
      status: 'FT-PEN-AET',
    },
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchLastFixtures = async (last: number): Promise<Fixture[]> => {
  var options = {
    method: 'GET',
    url: process.env.API_URL + '/fixtures',
    params: {
      last: last,
      // status: "FT-PEN-AET",
    },
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchCountries = async (): Promise<Country[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/countries',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchVenuesByCountryName = async (
  name: string
): Promise<Venue[]> => {
  const options = {
    method: 'GET',
    url: process.env.API_URL + '/venues',
    params: {
      counrty: name,
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  return await http
    .request(options)
    .then(function (response) {
      return response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const fetchTodayBets = async (): Promise<OddBetApi[]> => {
  let bets: OddBetApi[] = [];
  let pagination = 1;
  let total = 2;

  const options = {
    method: 'GET',
    url: process.env.API_URL + '/odds',
    params: {
      date: new Date().toISOString().substr(0, 10),
      page: pagination,
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  while (pagination < total) {
    options.params.page = pagination;
    await http
      .request(options)
      .then(function (response) {
        console.log(`Page ${pagination} of ${total} fetched`);
        
        total = response.data.paging.total;
        bets = bets.concat(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
    pagination++;
  }

  return bets;
};