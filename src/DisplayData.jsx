import { gql, useQuery } from '@apollo/client';
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
`

const QUERY_ALL_MOVIES = gql`
    query Users {
        movies {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`

const DisplayData = () => {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

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
        </div>
    )
};

export default DisplayData;
