import dbConnect from "../../utils/DbConnent"
import axios from "axios"
import { useState } from 'react'
export default async function handler(req, res) {
    const { method, query } = req
    dbConnect()

    switch (method) {
        case "GET":

            let data = (await axios.get(`https://api.themoviedb.org/3/search/${query.type}?api_key=${process.env.TMDB_API_KEY}&query=${query.query}&page=${query.page}&include_adult=true`)).data

            res.status(200).send({ results: data.results, page: data.page, totalPages: data.total_pages, totalResults: data.total_results, url: `api/search?query=${query.query}&type=${query.type}&page=` })
            break;

        default:
            break;
    }
}

const setSiblingPages = (query, type, page, totalPages) => {
    let prevPage = `api/search?query=${query}&type=${type}$page=${page}`
    let nextPage = `api/search?query=${query}&type=${type}$page=${page}`
    if (page < 2) {
        prevPage = `api/search?query=${query}&type=${type}$page=1`
    }
    else prevPage = `api/search?query=${query}&type=${type}$page=${page - 1}`
    if (page > totalPages - 1) {
        nextPage = `api/search?query=${query}&type=${type}$page=totalPages`
    }
    else nextPage = `api/search?query=${query}&type=${type}$page=${page + 1}`

    return { prevPage: prevPage, nextPage: nextPage }
}

const getType = (type) => {
    SearchTypes.forEach(element => {
        if (element === type && type !== 'all') {
            return element
        }
    });

    return 'multi'
}

const getGenre = (genre) => {

}

const SearchTypes = ['all', 'movie', 'tv']