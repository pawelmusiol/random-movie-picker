import axios from "axios";
import dbConnect from "../../../utils/DbConnent";
import userModel from "../../../utils/models/user";

export default async function handler(req, res) {
    const { method, query, body } = req
    await dbConnect()

    switch (method) {
        case "GET":
            let data = {
                details: await getDetails(query),
                credits: await getCredits(query)
            }
            res.send(data)
            break
        case "POST":
            addToFavourites(query.id, body.userId)

            res.send('dupa') 
    }
}

const addToFavourites = async (id, userId) => {
    let result = await userModel.findByIdAndUpdate(
        userId,
        {
            $push: {
                'favourite.people': id
            }
        }
    )
    console.log(result)
}

const getDetails = async (query) => {
    let result = (await axios.get(`https://api.themoviedb.org/3/person/${query.id}?language=${query.language}&api_key=${process.env.TMDB_API_KEY}`)).data
    return result
}

const getCredits = async (query) => {
    let movieResult = (await axios.get(`https://api.themoviedb.org/3/person/${query.id}/movie_credits?language=${query.language}&api_key=${process.env.TMDB_API_KEY}`)).data
    let tvResult = (await axios.get(`https://api.themoviedb.org/3/person/${query.id}/tv_credits?language=${query.language}&api_key=${process.env.TMDB_API_KEY}`)).data
    
    
    return {
        movie: getMovieData(movieResult),
        tv: getMovieData(tvResult)
    }
}

const getMovieData = (movies) => {
    let voteAverage = 0
    let averageBottom = 0
    let moviesData = movies.cast.map(movie => {
        voteAverage+= movie.vote_average * movie.vote_count,
        averageBottom += movie.vote_count
        return {
            id: movie.id,
            title: movie.title ? movie.title : movie.name,
            posterPath: movie.poster_path,
            character: movie.character,
            voteAverage: movie.vote_average,
            backdropPath: movie.backdrop_path,
        }
    })
    moviesData = moviesData.sort((a,b) => {
        if(a.voteAverage > b.voteAverage) return -1
    })
    return {
        voteAverage: voteAverage / averageBottom,
        results: moviesData
    }
}