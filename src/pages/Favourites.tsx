import * as React from "react";
import { useAppSelector } from "../redux/hooks"
import { favourites } from '../redux/moviesMetaSlice'
import { useNavigate } from "react-router-dom";
import { Container, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const Favourites = () => {
  const selectedFavourites = useAppSelector(favourites)
  const navigate = useNavigate();

  const handleMovieClick = (_e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
    navigate(`/detail?imdbID=${id}`)
  }

  return (
    <Container>
      <Typography variant={'h4'} sx={{ fontWeight: 400, marginTop: '2rem', color: 'secondary.contrastText' }}>Favourite Movies</Typography>
      <List
        sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', justifyContent: 'center' }}
      >
        {selectedFavourites && selectedFavourites.map(entry => {
          return (
            <ListItem key={entry.id} disablePadding onClick={(e) => handleMovieClick(e, entry.id)}>
              <ListItemButton>
                <ListItemText inset primary={entry.title} />
                <StarIcon
                  sx={{ cursor: 'pointer', color: '#d9d622', marginLeft: '2rem', fontSize: 40 }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}

export default Favourites
