import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';

const QUERY_ALL_USERS = gql`
    query Users {
        users {
            name
            age
            id
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query Users {
        movies {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`;

const DisplayData = () => {

    const [movieSearch, setMovieSearch] = React.useState('');

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error);
    }

    return (
        <div>
            {data &&
                data.users.map(user =>
                    <div key={user.id}>
                        <h3>Name: {user.name}</h3>
                        <p>Age: {user.age}</p>
                        <p>Username: {user.username}</p>
                        <p>Nationality: {user.nationality}</p>
                    </div>
                )
            }

            {movieData &&
                movieData.movies.map(movie =>
                    <div key={movie.id}>
                        <h3>Movie Name: {movie.name}</h3>
                    </div>
                )
            }

            <div className="">
                <input type="text" placeholder='Interstellar...' onChange={(e) => { setMovieSearch(e.target.value) }} />
                <button onClick={() => fetchMovie({
                    variables:
                    {
                        name: movieSearch,
                    },
                })}>Search</button>
                <div>
                    {movieSearchData &&
                        movieSearchData.movie.map(movie =>
                            <div key={movie.id}>
                                <h3>Movie Name: {movie.name}</h3>
                                <h3>Year of Publication: {movie.yearOfPublication}
                                </h3>
                                <h3>Is in theaters: {movie.isInTheaters ? 'Yes' : 'No'}</h3>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
};

export default DisplayData;
