import dbConnect from "../../../utils/DbConnent"
import axios from "axios"

export default async function handler(req, res) {
    const { method, query } = req

    console.log(query)

    await dbConnect()

    switch (method) {
        case "GET":
            let data = {
                providers: await getProviders(query.id, query.language, query.type),
                ...(await getDetails(query.id, query.language, query.type)),
                media: await getMedia(query.id, query.language, query.type),
                credits: await getCredits(query.id, query.language, query.type),
                similarMovies: await getSimilar(query.id, query.language, query.type),
            }
            res.status(200).send(data)
            break;

        default:
            break;
    }
}

const getSimilar = async (id, language, type) => {
    let similarMovies = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    let results =[]
    for (let i = 0; i < similarMovies.results.length; i++) {
        results.push({
            name: type === 'tv' ? similarMovies.results[i].name : similarMovies.results[i].title,
            poster: similarMovies.results[i].poster_path,
            id: similarMovies.results[i].id,
            mediaType: type
        })
        if (i === 5) break
    }
    return results
}

export const getProviders = async (id, language, type) => {
    let providers = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`)).data
    language = language.split('-')[1]
    providers = providers.results[language]

    if (!providers) return null
    delete providers.link
    let combinedProviders = []
    for (const key in providers) {
        providers[key].forEach(singleProvider => {
            let index = combinedProviders.findIndex(sp => sp.provider_name === singleProvider.provider_name)
            console.log(singleProvider)
            if (index !== -1) {
                combinedProviders[index].types = [...combinedProviders[index].types, key]
            }
            else {
                combinedProviders.push({ ...singleProvider, types: [key] })
            }
        })
    }
    return combinedProviders
}

const getDetails = async (id, language, type) => {
    if (type === 'movie') return await getMovieDetails(id, language)
    if (type === 'tv') return await getTvDetails(id, language)
}

const getTvDetails = async (id, language) => {
    const tvData = (await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    let details = {
        type: 'tv',
        title: tvData.name,
        originalTitle: tvData.original_name,
        voteAverage: tvData.vote_average,
        releaseYear: tvData.first_air_date.slice(0, 4),
        numberOfEpisodes: tvData.number_of_episodes,
        numberOfSeasons: tvData.number_of_seasons
    }
    let info = {
        genres: tvData.genres,
        productionCompanies: tvData.production_companies,
        productionCountries: tvData.production_countries,
        overview: tvData.overview,
        firstEpisode: tvData.first_air_date,
        lastEpisode: tvData.last_air_date,
        inProduction: tvData.in_production,
    }
    return { details: details, info: info }
}

const getMovieDetails = async (id, language) => {
    const movieData = (await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    let details = {
        type: 'movie',
        title: movieData.title,
        originalTitle: movieData.original_title,
        releaseYear: movieData.release_date.slice(0, 4),
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
    }
    return { details: details, info: info }
}


const getMedia = async (id, language, type) => {
    let movieVideos = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    if (!movieVideos.results.length) {
        movieVideos = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}`)).data
    }

    let movieImages = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.TMDB_API_KEY}`)).data
    let poster = movieImages.posters[0]
    movieImages = movieImages.backdrops.filter(image => image.iso_639_1 === null)

    return {
        poster: poster,
        images: movieImages,
        videos: movieVideos.results
    }
}

const getCredits = async (id, language, type) => {
    let credits = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?language=${language}&api_key=${process.env.TMDB_API_KEY}`)).data
    return {
        crew: credits.crew,
        cast: credits.cast,
    }
}