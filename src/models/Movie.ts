export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface SearchMoviesApiResponse {
  Search: Movie[]
  totalResults: string
}

export interface SearchParams {
  page: number
  searchString: string
}

export interface Rating {
  Source: string
  Value: String
}

export interface DetailApiResponse {
  Actors: string
  Awards: string
  BoxOffice: string
  Country: string
  DVD: string
  Director: string
  Genre: string
  Language: string
  Metascore: string
  Plot: string
  Poster: string
  Production: string
  Rated: string
  Ratings: Rating[]
  Released: string
  Response: string
  Runtime: string
  Title: string
  Type: string
  Website: string
  Writer: string
  Year: string
  imdbID: string
  imdbRating: string
  imdbVotes: string
}

export interface Favourite {
  id: string
  title: string
}

export interface MoviesMetaSliceState {
  page: number
  searchString: string
  favourites: Favourite[]
}
