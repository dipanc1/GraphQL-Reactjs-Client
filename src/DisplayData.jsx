import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
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

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
        }
    }
`

const DisplayData = () => {

    const [movieSearch, setMovieSearch] = React.useState('');


    //Create User States
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [nationality, setNationality] = React.useState('');

    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    if (loading) {
        return <div>Loading...</div>
    }

    if (movieError) {
        console.log(movieError);
    }

    return (
        <div>
            <div>
                <input type="text" placeholder='Name...' onChange={(e) => { setName(e.target.value); }} />
                <input type="text" placeholder='Username...' onChange={(e) => { setUsername(e.target.value); }} />
                <input type="number" placeholder='Age...' onChange={(e) => { setAge(e.target.value); }} />
                <input type="text" placeholder='Nationality...' onChange={(e) => { setNationality(e.target.value.toUpperCase()); }} />
                <button onClick={() => {
                    createUser({
                        variables: {
                            input:
                                { name, username, age: 21, nationality }
                        },
                    });
                    refetch();
                }}>Create User</button>
            </div>
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
                        (
                            <div key={movieSearchData.movie.id}>
                                <h3>Movie Name: {movieSearchData.movie.name}</h3>
                                <h3>Year of Publication: {movieSearchData.movie.yearOfPublication}
                                </h3>
                                <h3>Is in theaters: {movieSearchData.movie.isInTheaters ? 'Yes' : 'No'}</h3>
                            </div>
                        )
                    }
                    {movieError &&
                        <div>
                            <h3>Movie not found</h3>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
};

export default DisplayData;
