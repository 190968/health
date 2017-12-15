import { ApolloClient } from 'apollo-client';
import { toIdValue } from 'apollo-utilities';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'http://api.fitangodev.com/graphql.php',

});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const cache = new InMemoryCache({
    dataIdFromObject: object => {
        //console.log(object.__typename);
        switch (object.__typename) {
            //case 'Plan': return object.id; // use `key` as the primary key
            //case 'bar': return object.blah; // use `blah` as the priamry key
            default: return object.id || object._id; // fall back to `id` and `_id` for all other types
        }
    },
    cacheResolvers: {
        Query: {
            plan: (_, args) => {toIdValue(args.id)},
        },
    },
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache
});

export default apolloClient;



