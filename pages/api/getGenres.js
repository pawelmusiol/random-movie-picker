import dbConnect from "../../utils/DbConnent"
import axios from "axios"

export default async function handler(req, res) {
    const { method } = req

    dbConnect()

    switch (method) {
        case "GET":
            const genres = (await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}`)).data
            res.status(200).send(genres)
            break;

        default:
            break;
    }
}
