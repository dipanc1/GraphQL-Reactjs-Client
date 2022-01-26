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
    const { data } = useQuery(QUERY_ALL_USERS);

    if (!data) {
        console.log(data);
    }

    return <div>

    </div>;
};

export default DisplayData;
