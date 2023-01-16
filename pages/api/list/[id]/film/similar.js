import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"


export default async function handler(req, res) {
    const { method, body, query } = req

    switch (method) {
        case "POST":
            let result = await getSimilarMovies(body.films, body.language)
            res.send(result)
            break;
    }
}

const getSimilarMovies = async (films, language) => {
    let result = await Promise.all(films.map(async (movie) => {
        let movieResult = (await axios.get(`https://api.themoviedb.org/3/${movie.type}/${movie.id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=${language}`)).data
        if (movieResult.results[0]) {
            console.log(movieResult.results[0])
            return {
                name: movieResult.results[0].title ? movieResult.results[0].title : movieResult.results[0].name,
                poster: movieResult.results[0].poster_path,
                id: movieResult.results[0].id,
                mediaType: movieResult.results[0].media_type
            }
        }
    }))
    result = result.filter(r => r !== undefined)
    return result
}