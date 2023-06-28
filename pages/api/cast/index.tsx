import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../utils/DbConnent"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                let result = (await axios.get(`https://api.themoviedb.org/3/search/person?query=${query.query}&api_key=${process.env.TMDB_API_KEY}&language=${query.language}&page=1&include_adult=true`)).data
                result = result.results.filter(res => res.known_for_department === 'Acting')
                    .map(res => { return { id: res.id, name: res.name } })
                res.status(200).send(result)
            } catch (e) {
                console.log(e)
                res.status(400).send('Person not found')
            }
            break;
    }
}