import { gql, useQuery } from '@apollo/client';
import React from 'react';

const QUERY_ALL_USERS = gql`
    query Users {
        users {
            name
            age
            id
            username
        }
    }
`

const DisplayData = () => {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error);
    }


    return <>
        {data && data.users.map(user => <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.age}</p>
            <p>{user.username}</p>
        </div>)}
    </>
};

export default DisplayData;
