import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyGetMovieDetailQuery } from "../redux/moviesApiSlice";
import { Box, Container, Paper, Typography } from "@mui/material";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { favourites, addFavourite, removeFavourite } from '../redux/moviesMetaSlice'

const Detail = (): ReactElement | null => {
  const [getMovieDetail, { data, isError, isLoading, isSuccess }] = useLazyGetMovieDetailQuery()
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  let [searchParams] = useSearchParams();
  const imdbID = searchParams.get('imdbID')

  const dispatch = useAppDispatch()
  const selectedFavourites = useAppSelector(favourites)

  useEffect(() => {
    if (imdbID) {
      getMovieDetail(imdbID)
    }
  }, [imdbID])

  useEffect(() => {
    if (selectedFavourites && data?.imdbID) {
      const index = selectedFavourites.findIndex(entry => entry.id === data.imdbID)
      if(index === -1) {
        setIsFavourite(false)
      } else {
        setIsFavourite(true)
      }
    }

  }, [data, selectedFavourites])

    const handleStarClick = (isFavourite: boolean): void => {
      if (isFavourite && data?.imdbID) {
        dispatch(removeFavourite(data.imdbID))
      } else if (!isFavourite && data?.imdbID){
        dispatch(addFavourite({id: data.imdbID, title: data.Title}))
      }
    }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  if (isSuccess) {
    return (
      <Container>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', margin: '10px', padding: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              sx={{ fontWeight: 700, marginBottom: '2rem', color: 'primary.main' }}
              variant={'h4'}>
              {data.Title}{isFavourite ?
                <StarIcon
                  sx={{ cursor: 'pointer', color: '#d9d622', marginLeft: '2rem', fontSize: 60 }}
                  onClick={(e) => handleStarClick(isFavourite)}
                /> :
                <StarBorderOutlinedIcon
                sx={{ cursor: 'pointer', color: '#d9d622', marginLeft: '2rem', fontSize: 60 }}
                onClick={(e) => handleStarClick(isFavourite)}
                />
              }
            </Typography>

            <img
              src={data.Poster}
              alt={data.Title}
              loading="lazy"
            />
            <Typography sx={{ fontWeight: 400, marginTop: '2rem', color: 'secondary.contrastText' }}>Actors:{data.Actors}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Awards:{data.Awards}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>BoxOffice:{data.BoxOffice}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Country:{data.Country}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>DVD:{data.DVD}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Director:{data.Director}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Genre:{data.Genre}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Language:{data.Language}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText', width: '50%' }}>Plot:{data.Plot}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Production:{data.Production}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Released:{data.Released}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Writer:{data.Writer}</Typography>
            <Typography sx={{ fontWeight: 400, color: 'secondary.contrastText' }}>Year:{data.Year}</Typography>
          </Paper>
        </Box>
      </Container>
    )
  }
  return null
}

export default Detail