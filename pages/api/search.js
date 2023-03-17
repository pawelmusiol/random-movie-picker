import dbConnect from "../../utils/DbConnent"
import axios from "axios"
import { useState } from 'react'
import { getProviders } from "./movie/[id]"

export default async function handler(req, res) {
    const { method, query } = req
    await dbConnect()

    switch (method) {
        case "GET":

            let data = await getMovies(query)
            res.status(200).send({ results: data.results, page: data.page, totalPages: data.total_pages, totalResults: data.total_results, url: `api/search?query=${query.query}&type=${query.type}&page=` })
            break;

        default:
            break;
    }
}

const getMovies = async (query) => {
    let data = (await axios.get(`https://api.themoviedb.org/3/search/${query.type}?api_key=${process.env.TMDB_API_KEY}&query=${query.query}&page=${query.page}&include_adult=true&language=${query.language}`)).data
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
    console.log(results)
    return await Promise.all(results.map(async (movie) => {
        return {
            ...movie,
            providers: await getProviders(movie.id, language, type)
        }
    }))
}

const SearchTypes = ['all', 'movie', 'tv']