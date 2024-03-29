import axios from "axios";
import dbConnect from "../../../utils/DbConnent";
import userModel from "../../../utils/models/user";
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, query, body } = req
    await dbConnect()

    switch (method) {
        case "GET":
            try {
                let data = {
                    details: await getDetails(query),
                    credits: await getCredits(query)
                }
                res.status(200).send(data)
            } catch (err) {
                if (err.response.status === 404) {
                    res.status(404).send({ message: 'Person Not Found' })
                }
                else {
                    res.status(500).send({ message: 'Something Went Wrong' })
                }
            }
            break
        /* case "POST":
            addToFavourites(query.id, body.userId)

            res.send('dupa') */
    }
}

const addToFavourites = async (id, userId) => {
    let result = await userModel.findByIdAndUpdate(
        userId,
        {
            $addToSet: {
                'favourite.people': id
            }
        }
    )
    return result
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
        voteAverage += movie.vote_average * movie.vote_count,
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
    moviesData = moviesData.sort((a, b) => {
        if (a.voteAverage > b.voteAverage) return -1
    })
    return {
        voteAverage: voteAverage / averageBottom,
        results: moviesData
    }
}