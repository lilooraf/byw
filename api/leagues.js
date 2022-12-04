import axios from 'axios';

export const fetchLeagueByID = (id) => {

    var options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: {id: id},
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': 'fc6691cc02msh210b1a3c7b08c25p1fb0e7jsn6fcecd276f04'
        }
      };

    axios.request(options).then(function (response) {

        console.log(response.data.response);

        response.data.response.forEach(league => {
            createLeague(league);
            createCountry(league.country)
        });

    }).catch(function (error) {
        console.error(error);
    });
};

const createLeague = async (league) => {

    await setDoc(doc(db, "leagues", league.league.id.toString()), {league});

};

const createCountry = async (country) => {

    await setDoc(doc(db, "countries", country.code), {country});

};