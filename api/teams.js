import axios from 'axios';


export const fetchTeamByID = (id) => {

    var options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {id: id},
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': 'fc6691cc02msh210b1a3c7b08c25p1fb0e7jsn6fcecd276f04'
        }
    };

    axios.request(options).then(function (response) {

        console.log(response.data.response);

        response.data.response.forEach(team => {

            createTeam(team);
            createVenue(team.venue);

        });

    }).catch(function (error) {
        console.error(error);
    });
};

const createTeam = async (team) => {

    await setDoc(doc(db, "teams", team.team.id.toString()), {team});
    
};

const createVenue = async (venue) => {

    await setDoc(doc(db, "venues", venue.id.toString()), {venue});

};