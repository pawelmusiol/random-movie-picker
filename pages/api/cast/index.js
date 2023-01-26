import axios from "axios"
import dbConnect from "../../../utils/DbConnent"


export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            let result = (await axios.get(`https://api.themoviedb.org/3/search/person?query=${query.query}&api_key=${process.env.TMDB_API_KEY}&language=${query.language}&page=1&include_adult=true`)).data
            result = result.results.filter(res => res.known_for_department === 'Acting')
            .map(res => { return { id: res.id, name: res.name}})
            res.status(200).send(result)
            break;
    }
}