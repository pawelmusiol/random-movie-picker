import dbConnect from "../../../utils/DbConnent"
import axios from "axios"
import { useState } from 'react'
import { getProviders } from ".././movie/[id]"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, query } = req
    await dbConnect()
    switch (method) {
        case "GET":

            let data = await getMovies(query)
            if (!data.results || data.results.length === 0) {
            res.status(404).send({message: "No movies found"})
            break;
            }
            
            res.status(200).send({ results: data.results, page: data.page, totalPages: data.total_pages, totalResults: data.total_results, url: `api/search/movie-tv?query=${query.query}&type=${query.type}&include_adult=${query.include_adult}&page=1` })
            break;

        default:
            break;
    }
}

const getMovies = async (query) => {
    let data = (await axios.get(`https://api.themoviedb.org/3/search/${query.type}?api_key=${process.env.TMDB_API_KEY}&query=${query.query}&page=${query.page}&include_adult=${query.include_adult}&language=${query.language}`)).data
    if (query.genre && query.genre !== '0') {
        query.genre = parseInt(query.genre)
        data.results = data.results.filter(movie => {
            return movie.genre_ids.includes(query.genre)
        })
    }

    data.results = await getSingleMovieProviders(data.results, query.type, query.language)
    return data
}

const getSingleMovieProviders = async (results, type, language) => {
    return await Promise.all(results.map(async (movie) => {
        return {
            ...movie,
            providers: await getProviders(movie.id, language, type)
        }
    }))
}
