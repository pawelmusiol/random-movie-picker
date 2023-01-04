import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"

const getFilms = async (films, language) => {
    return Promise.all(films.map(async (film) => {
        let result = (await axios.get(`https://api.themoviedb.org/3/${film.type}/${film.id}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)).data
        //console.log(result)
        return {
            _id: film._id,
            name: result.name ? result.name : result.title,
            posterPath: result.poster_path,
            releaseDate: result.release_date ? result.release_date : result.first_air_date
        }

    }))
}

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                console.log(query)
                let result = await listModel.findById(query.id)
                let FilmsData = await getFilms(result.films, query.language)
                res.send(FilmsData)
            } catch (err) {

            }
            break;
        case "POST":
            try {
                let result = await listModel.updateOne({ _id: query.id }, {
                    $push: {
                        'films': {
                            'id': body.film.id,
                            'name': body.film.name,
                            'addedBy': {
                                _id: body.user.id,
                                name: body.user.name
                            },
                            'type': body.film.type
                        }
                    }
                })
                console.log(result)
                res.status(200).send({ text: 'Film Added' })
            } catch (err) {
                console.log(err)
                res.status(500).send({ text: 'Something Went Wrong' })
            }
            break;
        case "DELETE":
            break;
    }
}