import dbConnect from "../../../utils/DbConnent"
import axios from "axios"

export default async function handler(req, res) {
    const { method, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            let data = {
                providers: await getProviders(query.id, query.language),
                ...(await getDetails(query.id, query.language)),
                media: await getMedia(query.id, query.language),
                credits: await getCredits(query.id, query.language),
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
    return providers.results[language]
}

const getDetails = async (id, language) => {
    const movieData = (await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    console.log(movieData)
    let details = {
        title: movieData.title,
        originalTitle: movieData.original_title,
        releaseYear: movieData.release_date.slice(0,4),
        runtime: movieData.runtime,
        voteAverage: movieData.vote_average
    }
    let info = {
        revenue: movieData.revenue,
        budget: movieData.budget,
        genres: movieData.genres,
        productionCompanies: movieData.production_companies,
        productionCountries: movieData.production_countries,
        overview: movieData.overview,
        tagline: movieData.tagline
    }
    return {details: details, info: info}
}

const getMedia = async (id, language) => {
    let movieVideos = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    if (!movieVideos.results.length) {
        movieVideos = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`)).data
    }

    let movieImages = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_API_KEY}`)).data
    
    movieImages = movieImages.backdrops.filter(image => image.iso_639_1 === null)

    return {
        images: movieImages,
        videos: movieVideos.results
    }
}

const getCredits = async (id, language) => {
    let credits = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    return { 
        crew: credits.crew,
        cast: credits.cast,
    }
}