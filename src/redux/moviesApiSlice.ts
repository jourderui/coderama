import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import config from "../config";

export const moviesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.OMDB_HOST }),
  reducerPath: "moviesApi",
  tagTypes: ["Movies", "Movie"],
  endpoints: build => ({
    searchMovies: build.query<SearchMoviesApiResponse, SearchParams>({
      query: (searchParams) => `?apikey=${config.OMDB_API_KEY}&s=${searchParams.searchString}&page=${searchParams.page}`,
      providesTags: (result, error, searchParams) => [{ type: "Movies", searchParams }],
    }),
    getMovieDetail: build.query<DetailApiResponse, string>({
      query: (imdbID) => `?apikey=${config.OMDB_API_KEY}&i=${imdbID}`,
      providesTags: (result, error, id) => [{ type: "Movie", id }],
    }),
  }),
})

export const {
  useSearchMoviesQuery,
  useLazySearchMoviesQuery,
  useGetMovieDetailQuery,
  useLazyGetMovieDetailQuery
} = moviesApiSlice
