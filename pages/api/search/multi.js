import axios from 'axios'

export default async function handler(req, res) {
    const { method, query } = req
    switch (method) {
        case "GET":
            console.log(query)
            let tmdbData = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query.query}&language=${query.language}&api_key=${process.env.TMDB_API_KEY}`)

            let result = tmdbData.data.results.map(single => {
                return {
                    id: single.id,
                    title: single.name ? single.name : single.title,
                    mediaType: single.media_type === 'person' ? 'people' : single.media_type,
                    posterPath: single.profile_path ? single.profile_path : single.poster_path,
                }
            })
            

            res.status(200).send({ results: result })
            break
    }
}
