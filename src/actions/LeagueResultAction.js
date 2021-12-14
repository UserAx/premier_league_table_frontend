import generateAxiosInstance from '../utils/AxiosInstance';

const GET_LEAGUE_RESULT = "GET_LEAGUE_RESULT";
// const baseURL = process.env.BACKEND_URL || "http://localhost:3000";
const baseURL = 'https://premier-league-server.herokuapp.com';

const addLeagueResults = (payload) => ({
    type: GET_LEAGUE_RESULT,
    payload
});

export const fetchLeagueResult = (season = "") => {
    return async (dispatch) => {
        return await generateAxiosInstance(baseURL).get(`/league/season=${season || ''}`)
        .then((result)=> {
            dispatch(addLeagueResults(result.data));
        }).catch((e) => console.log("Error fetching", e));
    }
}