import { Prisma } from '@prisma/client';
import { BywCustom } from '../bywAlgo/process';
import prisma from '../lib/prisma';
import { getFromDBLeagueById } from './getFromDB';
import { Country, Fixture, LeagueData, Standing, Season } from './types';

export const storeStandingsd = async (standingsData: Standing[]) => {
  if (!standingsData) return;

  standingsData.forEach((data) => {
    getFromDBLeagueById(data.league.id).then((league) => {
      // console.log(data, league.seasons);
      data.league.standings.forEach((st) => {
        st.forEach(async (standing) => {
          // console.log(data.league);
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
              // console.error(error);
            });
          await prisma.standing
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
            .then(() => {
              // console.log("Standings stored");
            })
            .catch((error) => {
              console.error(error);
              console.log(standing);
            });
        });
      });
    });
  });
};

export const storeStandings = async (standingsData: Standing[]) => {
  if (!standingsData) return;

  standingsData.forEach((data) => {
    getFromDBLeagueById(data.league.id).then((league) => {
      // console.log(data, league.seasons);
      data.league.standings.forEach((st) => {
        st.forEach(async (standing) => {
          // console.log(data.league);
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
              // console.error(error);
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
              .catch((error) => {
                console.log(
                  'Team not found id',
                  standing.team.name,
                  standing.team.id
                );
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
                  .catch((error) => {
                    console.error(error);
                    console.log(standing);
                  });
              })
              .catch(() => {
                console.log(
                  'Team not found name',
                  standing.team.name,
                  standing.team.id
                );
              });
          }
        });
      });
    });
  });
};

// export const storeFixture = async (
//   fixture: Fixture,
//   leagueData: LeagueData,
//   venue: Venue | null,
//   parent: Fixture | null = null
// ) => {
//   prisma.fixture
//     .upsert({
//       create: {
//         id: fixture.fixture.id,
//         date: fixture.fixture.date,
//         winnerAway: fixture.teams.away.winner,
//         winnerHome: fixture.teams.home.winner,
//         timestamp: fixture.fixture.timestamp,
//         timezone: fixture.fixture.timezone,
//         score: fixture.score,
//         TeamHome: {
//           connectOrCreate: {
//             where: {
//               id: fixture.teams.home.id,
//             },
//             create: {
//               id: fixture.teams.home.id,
//               logo: fixture.teams.home.logo,
//               name: fixture.teams.home.name,
//               League: {
//                 connect: {
//                   id: fixture.league.id,
//                 },
//               },
//             },
//           },
//         },
//         TeamAway: {
//           connectOrCreate: {
//             where: {
//               id: fixture.teams.away.id,
//             },
//             create: {
//               id: fixture.teams.away.id,
//               logo: fixture.teams.away.logo,
//               name: fixture.teams.away.name,
//               League: {
//                 connect: {
//                   id: fixture.league.id,
//                 },
//               },
//             },
//           },
//         },
//         League: {
//           connectOrCreate: {
//             where: {
//               id: leagueData.league.id,
//             },
//             create: {
//               id: leagueData.league.id,
//               logo: leagueData.league.logo,
//               name: leagueData.league.name,
//               type: leagueData.league.type,
//               Country: {
//                 connectOrCreate: {
//                   where: {
//                     code: leagueData.country.code,
//                   },
//                   create: {
//                     code: leagueData.country.code,
//                     flag: leagueData.country.flag,
//                     name: leagueData.country.name,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       update: {
//         winnerAway: fixture.teams.away.winner,
//         winnerHome: fixture.teams.home.winner,
//         score: fixture.score,
//       },
//       where: {
//         id: fixture.fixture.id,
//       },
//     })
//     .then(() => {
//       console.log("Fixture " + fixture.fixture.id + " succesfully stored.");

//       if (venue) {
//         // console.log(venue);

//         prisma.fixture
//           .update({
//             where: {
//               id: fixture.fixture.id,
//             },
//             data: {
//               Venue: {
//                 connectOrCreate: {
//                   where: {
//                     id: venue.id,
//                   },
//                   create: {
//                     address: venue.address,
//                     city: venue.city,
//                     image: venue.image,
//                     name: venue.name,
//                     id: venue.id,
//                     capacity: venue.capacity,
//                     countryCode: leagueData.country.code,
//                   },
//                 },
//               },
//             },
//           })
//           .then((res) => {
//             // linkToParent(fixture, parent);
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//       } else {
//         // linkToParent(fixture, parent);
//       }
//     })
//     .catch((err) => {
//       // console.log(err);
//     });
// };


const hasWin = (score: Prisma.JsonValue, home: boolean): boolean | null => {
  var homePoint = false;
  var awayPoint = false;
  const moments = ['penalty', 'extratime', 'fulltime', 'halftime'];

  moments.forEach((moment) => {
    if (!homePoint && !awayPoint && score[moment].home != null) {
      if (score[moment].home > score[moment].away)
        homePoint = true;
      if (score[moment].home < score[moment].away)
        awayPoint = true;
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

  moments.forEach((moment) => {
    if (!homePoint && !awayPoint && score[moment].home != null) {
      homePoint = score[moment].home;
      awayPoint = score[moment].away;
    }
  });
  return home ? homePoint : awayPoint;
};

export const storeFixture = async (fixture: Fixture) => {
  const res = prisma.fixture.upsert({
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
  });

  return await prisma
    .$transaction([res])
    .then((res) => {
      // console.log(res);
      // console.log("Fixture " + fixture.fixture.id + " succesfully stored.");
    })
    .catch((err) => {
      // if (err.code != "P2002") {
      //   console.log(err);
      //   console.log(fixture);
      // }
    });
};

// export const linkToParent = async (
//   fix: Fixture,
//   parent: Fixture | null = null
// ) => {
//   if (parent == null) {
//     console.log("No parent");

//     return;
//   }
//   // console.log("-----------------------------------------------");

//   // console.log(fix);
//   // console.log("parent " + parent.fixture.id);

//   if (fix.fixture.id == parent.fixture.id) {
//     console.log("SAME");

//     return;
//   } else {
//     prisma.fixture
//       .update({
//         where: {
//           id: fix.fixture.id,
//         },
//         data: {
//           ParentH2hFixture: {
//             connect: {
//               id: parent.fixture.id,
//             },
//           },
//         },
//       })
//       .then((res) => {
//         console.log(
//           "Fixture " +
//             fix.fixture.id +
//             " Linked to " +
//             parent.fixture.id +
//             " as H2H Away."
//         );

//         // console.log(res);
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   }
// };

export const storeCountries = async (countries: Country[]) => {
  countries.push({
    name: 'World',
    code: 'WORLD',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1599px-International_Flag_of_Planet_Earth.svg.png',
  });

  prisma.country.createMany({
    data: countries,
  });
};

export const storeCountry = async (country: Country) => {
  return await prisma.country
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
    .catch((err) => {});
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
  });

  league.seasons.forEach(async (season) => {
    await storeSeason(season, league.league.id);
  });
};

export const storeSeason = async (season: Season, leagueID: number) => {
  prisma.season
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
      // console.log(err);
      // console.log(season);
    });
};

export const addOrUpdateBywFixtureById = async (fixtureID: number, byw: BywCustom) => {
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
          }
        }


      },
    },
  });
}