import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { verifyToken } from "../../../auth"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, body, query } = req

    switch (method) {
        case "POST":
            let tokenData = verifyToken(query.token as string)
            if (tokenData.isExpired) {
                res.status(401).send('Token Expired')
                break;
            }
            let result = await getSimilarMovies(body.films, body.language as string)
            res.send(result)
            break;
    }
}


const getSimilarMovies = async (films:IFilm[], language: string) => {
    let result = await Promise.all(films.map(async (movie) => {
        let movieResult = (await axios.get(`https://api.themoviedb.org/3/${movie.type}/${movie.id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=${language}`)).data
        if (movieResult.results[0]) {
            return {
                title: movieResult.results[0].title ? movieResult.results[0].title : movieResult.results[0].name,
                posterPath: movieResult.results[0].poster_path,
                id: movieResult.results[0].id,
                mediaType: movieResult.results[0].media_type
            }
        }
    }))
    result = result.filter(r => r !== undefined)
    return result
}