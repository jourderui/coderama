import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReactElement, useEffect, useState } from "react";
import { useLazySearchMoviesQuery } from "../redux/moviesApiSlice";
import { FormControl, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Pagination, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { page, searchString, setPage, setSearchString } from '../redux/moviesMetaSlice'
import { Movie, SearchMoviesApiResponse } from "../models/Movie";

export const Search = (): ReactElement => {
  const [pageCount, setPageCount] = useState<number>(0)
  const [searchMoviesQuery, { data, isError, isLoading, isSuccess }] = useLazySearchMoviesQuery()
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const selectedPage = useAppSelector(page)
  const selectedSearchString = useAppSelector(searchString)
  const [localSearchString, setLocalSearchString] = useState<string>(selectedSearchString)

  useEffect(() => {
    if (localSearchString !== '') {
      searchMovies()
    }
  }, [selectedPage]);

  useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void; }) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (localSearchString !== '') {
          searchMovies()
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [localSearchString]);

  const searchMovies = () => {
    searchMoviesQuery({ searchString: localSearchString, page: selectedPage })
      .then((result) => {
        if (result.data && result.data.totalResults) {
          const nr = Number(result.data.totalResults)
          if (!isNaN(nr)) {
            setPageCount(Math.ceil(nr / 10))
          }
        }
      })
  }

  const handleImageClick = (_e: React.MouseEvent<HTMLImageElement, MouseEvent>, entry: Movie) => {
    navigate(`/detail?imdbID=${entry.imdbID}`)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value))
  }

  const handleClick = (_event: React.ChangeEvent<unknown>) => {
    searchMovies()
  }

  const handleSetSearchString = (value: string) => {
    setLocalSearchString(value)
    dispatch(setSearchString(value))
  }


  const renderMovies = (
    data: SearchMoviesApiResponse | undefined
  ): ReactElement[] | ReactElement => {
    const searchData: Movie[] | undefined = data?.Search;
    if (searchData) {
      return searchData.map((entry: Movie) => {
        return (
          <Paper key={entry.imdbID} elevation={3} sx={{ width: '20%', cursor: 'pointer', margin: '10px', padding: '10px' }}>
            <ImageListItem  >
              <img
                src={entry.Poster}
                alt={entry.Title}
                loading="lazy"
                onClick={(e) => handleImageClick(e, entry)}
              />
              <ImageListItemBar
                title={entry.Title}
                subtitle={<span>Year: {entry.Year}</span>}
                position="below"
              />
            </ImageListItem>
          </Paper>
        );
      });
    }
    return <></>;
  };

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

  return (
    <Container>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', }}
      >
        <FormControl onSubmit={handleClick} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            sx={{ marginTop: '10%', marginBottom: '10%', width: '300px', color: 'secondary.contrastText', }}
            id="filled-search"
            label="Search Movie"
            type="search"
            variant="outlined"
            value={localSearchString}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleSetSearchString(event.target.value)
            }}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end" onClick={handleClick}>
                  <SearchIcon sx={{ cursor: "pointer" }} type="submit" />
                </InputAdornment>,
              },
            }}
          />
        </FormControl>
        <ImageList sx={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {isSuccess && renderMovies(data)}
        </ImageList>
      </Box>
      {pageCount > 0 && <Box
        sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', }}
      >
        <Pagination
          page={selectedPage}
          onChange={handlePageChange}
          count={pageCount}
          variant="outlined"
          shape="rounded"
          sx={{ marginTop: '10%', marginBottom: '10%', color: 'secondary.contrastText', }}
        />
      </Box>}
    </Container>
  );
};
