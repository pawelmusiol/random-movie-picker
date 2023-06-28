/* interface tvQueryData {
    primary_release_date:{
        gte: string,
        lte: string
    },
    watch_providers: string,
    with_genres: string,
    language: string,
    page: string,
}

interface movieQueryData extends tvQueryData {
    cast: string
} */

interface IAddedBy {
    name: string,
    _id: string,
}

interface IFilm {
    _id: string,
    id: number,
    name: string,
    type: string,
    addedBy: IAddedBy
}

interface IFinalFilmData {
    _id: string,
    name: string,
    posterPath: string,
    releaseDate: string,
    tmdbId: string,
    type: string,
    addedBy: IAddedBy
}