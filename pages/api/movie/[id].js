import dbConnect from "../../../utils/DbConnent"
import axios from "axios"

export default async function handler(req, res) {
    const { method, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            let data = {
                providers: await getProviders(query.id, query.language)
            }
            res.status(200).send(data)
            break;

        default:
            break;
    }
}

const getProviders = async (id, language) => {
    const providers = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`)).data
    language = language.split('-')[1]
    console.log(providers.results[language])
    return providers.results[language]
}
