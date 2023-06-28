import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { verifyToken } from "../../../auth"
import { NextApiRequest, NextApiResponse } from "next"



export const getFilms = async (films: IFilm[], language: string): Promise<IFinalFilmData[]> => {
    return Promise.all(films.map(async (film) => {
        let result = (await axios.get(`https://api.themoviedb.org/3/${film.type}/${film.id}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)).data
        //console.log(result)
        return {
            _id: film._id,
            name: result.name ? result.name : result.title,
            posterPath: result.poster_path,
            releaseDate: result.release_date ? result.release_date : result.first_air_date,
            tmdbId: result.id,
            type: film.type,
            addedBy: film.addedBy
        }

    }))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                let tokenData = verifyToken((query.token as string))
                if (tokenData.isExpired) {
                    console.log(tokenData)
                    res.status(401).send('Token Expired')
                    break;
                }
                let result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id })
                if (!result.films.length) {
                    res.status(204).send({})
                    break;
                }
                let FilmsData = await getFilms(result.films, query.language as string)
                res.status(200).send(FilmsData)
            } catch (err) {
                console.log(err)
                res.status(401).send({ message: 'Not Authorized' })
            }
            break;
        case "POST":
            try {
                let tokenData = verifyToken(query.token as string)
                if (tokenData.isExpired) {
                    res.status(401).send('Token Expired')
                }
                let filmsInList = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'films')

                let indexOfFilm = filmsInList.films.findIndex(dbFilm => dbFilm.id === parseInt(body.film.id))
                if (indexOfFilm > 0) {
                    res.status(409).send({ message: 'Movie Already In List' })
                    break;
                }

                let result = await listModel.updateOne({ _id: query.id, 'users._id': tokenData.id }, {
                    $addToSet: {
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