import dbConnect from "../../utils/DbConnent"
import axios from "axios"

export default async function handler(req, res) {
    const { method, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            try{
            const genres = (await axios.get(`https://api.themoviedb.org/3/genre/${query.type}/list?api_key=${process.env.TMDB_API_KEY}&language=${query.language}`)).data
            res.status(200).send(genres)
            break;
            } catch(e){
                res.status(404).send({message: "Cannot Get Genres"})
            }

        default:
            break;
    }
}
