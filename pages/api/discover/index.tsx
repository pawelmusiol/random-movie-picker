import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, query, url } = req
    console.log(url)
    switch (method) {
        case "GET":
            console.log(query)
            let data = {
                results: null,
                page: null,
                total_pages: null,
                total_results: null
            }
            if (query.type === 'movie') {
                data = await getMovies(query)
            }
            else if (query.type === 'tv') {
                data = await getTV(query)
            }
            console.log(data)
            if (!data.results || data.results.length === 0) {
                res.status(404).send({ message: 'No results found' })
            }
            else {
                res.status(200).send({
                    results: data.results,
                    page: data.page,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    url: url,
                })
            }
            break;

        default:
            break;
    }
}

const getMovies = async (data: Partial<{[key:string]:string | string[]}>) => {
    let dataString = ''
    for (const key in data) {
        if (key !== 'type') {
            dataString += `${key}=${data[key]}&`
        }
    }
    dataString += `with_region=${data.language.slice(0, 2)}&`
    console.log(dataString)
    let result = (await axios.get(`https://api.themoviedb.org/3/discover/${data.type}?${dataString}api_key=${process.env.TMDB_API_KEY}`)).data
    return result
}

const getTV = async (data: Partial<{[key:string]:string | string[]}>) => {
    let dataRetrieved = [
        `air_date.gte=${data['primary_release_date.gte']}`,
        `air_date.lte=${data['primary_release_date.lte']}`,
        `with_watch_providers=${data.watch_providers}`,
        `with_genres=${data.with_genres}`,
        `language=${data.language}`,
        `watch_region=${data.language.slice(0, 2)}`,
        `page=${data.page}`
    ]
    let dataString = dataRetrieved.join('&')
    let result = (await axios.get(`https://api.themoviedb.org/3/discover/${data.type}?${dataString}&api_key=${process.env.TMDB_API_KEY}`)).data
    return result
}