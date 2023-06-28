interface movieResult {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    providers?: number[] | null,
}

interface creditPerson {
    adult: boolean,
    credit_id: string,
    gender: number,
    id: number,
    known_for_department: string,
    title: string,
    original_name: string,
    popularity: number,
    posterPath: string,
}

interface castPerson extends creditPerson {
    character: string,
    order: number,
}

interface crewPerson extends creditPerson {
    department: string,
}

interface credits {
    cast: castPerson[],
    crew: crewPerson[],
}

interface details {
    releaseYear: string,
    title: string,
    type: string,
    id: number,
    voteAverage: number,
    originalTitle: string,
}

interface detailsTV extends details {
    numberOfEpisodes: number,
    numberOfSeasons: number,
}
interface detailsMovie extends details {
    runtime: number,
}

interface genres {
    id: number,
    name: string,
}

interface productionCompanies {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
}

interface productionCountries {
    iso_3166_1: string,
    name: string,
}

interface mediaInfo {
    firstEpisode: string,
    genres: genres[],
    inProduction: boolean,
    lastEpisode?: string,
    overview: string,
    productionCompanies: productionCompanies,
    productionCountries: productionCountries,
}

interface image {
    aspectRatio: number,
    file_path: string,
    height: string,
    iso_639_1: string | null,
    vote_average: number,
    vote_count: number,
    width: number,
}

interface video {
    id: string,
    iso_639_1: string | null,
    iso_3166_1: string | null,
    key: string,
    name: string,
    official: boolean,
    published_at: string,
    site: string,
    size: number,
    type: string,
}

interface media {
    images: image[],
    poster: image,
    videos: video[]
}

interface similarMovie {
    id: number,
    mediaType: string,
    title: string,
    posterPath: string
}
interface provider {
    id: number
}

type movieResults = movieResult[] | []

interface personCredit {
    backdropPath: string | null,
    character: string,
    id: number,
    posterPath: string,
    title: string,
    voteAverage: number
}

interface personDetails {
    adult: boolean,
    also_known_as?: string[],
    biography: string,
    birthday: string,
    deathday: string | null,
    gender: number,
    homepage: string | null,
    id: number,
    imdb_id: string,
    known_for_department: string,
    name: string,
    place_of_birth: string,
    popularity: number,
    profile_path: string | null,

}

interface userBase {
    name: string,
    _id: string,
}

interface listUser extends userBase {
    isAdmin: boolean,
    isOwner: boolean,
}

interface requestUser extends userBase {
    status: string,
}

interface listFilmBase {
    _id: string,
    id: number,
    name: string,
    type: string,
}

interface listFilm extends listFilmBase {
    addedBy: userBase,
}

interface list {
    _id: string,
    films: listFilm[],
    name: string,
    private: boolean,
    queue?: listFilmBase[],
    requests?: requestUser,
    users: listUser[],
} 

interface provider {
    logoPath: string,
    id: number,
    name: string,
}

interface IDiscoverResults {
    results?: movieResult[],
    page?: number,
    totalPages?: number,
    totalResults?: number,
    url?: string,
    type?: string,
    loading: boolean,
  }

  interface expandedListFilm extends listFilm {
    priority?: number,
    tmdbId: number,
    posterPath: string,
  }