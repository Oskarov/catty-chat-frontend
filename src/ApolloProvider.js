import React from 'react'
import App from './App';
import ApolloClient from "apollo-client";
import {split} from '@apollo/client'
import {getMainDefinition} from '@apollo/client/utilities'
import {InMemoryCache} from "apollo-cache-inmemory";
import {createHttpLink} from "apollo-link-http";
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from "apollo-link-context";
import {AuthProvider} from "./context/auth";
import {MessagesProvider} from "./context/message";
import {WebSocketLink} from '@apollo/client/link/ws';

let httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});


const authLink = setContext((req, pre) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

httpLink = authLink.concat(httpLink);

const token = localStorage.getItem('jwtToken');
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    }
});

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <AuthProvider>
            <MessagesProvider>
                <App/>
            </MessagesProvider>
        </AuthProvider>
    </ApolloProvider>
)