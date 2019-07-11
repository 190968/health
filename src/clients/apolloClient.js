import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, defaultDataIdFromObject, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import moment from "moment/moment";

import { message as MessageModal } from 'antd';
import {FragmentMatchers} from './fragmentMatchers';
import { cleanTypenameLink } from './cleanTypenameFieldLink';

const errorLink = onError(({ response, operation,networkError, graphQLErrors }) => {
    // console.log(networkError);
    // console.log(graphQLErrors);
    // console.log(response);
    // console.log(operation);
    if (graphQLErrors) {
        graphQLErrors.map(({ message, code, locations, path }) => {
                MessageModal.error(message);
                if (code === 'token_expired') {
                    // reset token
                    //localStorage.setItem('token', false);
                }

            /*console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),*/
        });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});
let useDevTools = process.env.NODE_ENV !== 'production';
let uri = 'http://api.fitangodev.com/graphql.php';
if (process.env.NODE_ENV === 'production') {
    uri = 'https://api.fitango.com/graphql.php';
}
switch(process.env.REACT_APP_HOST_ENV) {
    case 'stage':
        uri = 'http://api.fitangostg.com/graphql.php';
        useDevTools = true;
        break;
    case 'dev':
        uri = 'http://api.fitangodev.com/graphql.php';
        break;
}

const httpLink = createHttpLink({
    uri: uri
    //
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // console.log(token, 'TOKEN IN CONTEXT');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token && token !== '' ? `Bearer ${token}` : '',

        }
    }
});

// const afterwareLink = new ApolloLink((operation, forward) => {
   
//     return forward(operation).map(response => {
//       const { response: { headers } } = operation.getContext();
//       console.log(operation.getContext());
//       if (headers) {
//         const token = headers.get("x-token");
//         const refreshToken = headers.get("x-refresh-token");
  
//         if (token) {
//           localStorage.setItem("token", token);
//         }
  
//         if (refreshToken) {
//           localStorage.setItem("refreshToken", refreshToken);
//         }
//       }
  
//       return response;
//     });
//   });



const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        // eslint-disable-next-line id-match
        __schema: {
            types: FragmentMatchers
        }
    }
});


const unitId = process.env.NODE_ENV === 'production' ? 'MQ' : 'a1';
// const unitId = 'MQ';
const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: object => {
        switch (object.__typename) {
            case 'Image':  return null; 
            case 'AssessmentAnswer':  return null; 
            // case 'TrackerSummaryReport': return null;//;//defaultDataIdFromObject(object)+':'+moment(new Date(object.date)).format("YYYY-MM-DD"); // use `key` as the primary key
            // case 'TrackerReport': defaultDataIdFromObject(object)+':'+moment(new Date(object.date)).format("YYYY-MM-DD"); // use `key` as the primary key
            case 'MedicationReport': return defaultDataIdFromObject(object)+':'+moment(new Date(object.date)).format("YYYY-MM-DD"); // use `key` as the primary key
            case 'PlanBodyElementReport': return defaultDataIdFromObject(object)+':'+moment(new Date(object.date)).format("YYYY-MM-DD"); // use `key` as the primary key
            //case 'UserAssessmentReportValue': return defaultDataIdFromObject(object)+':'+object.id; // use `key` as the primary key
            case 'FieldReport': return defaultDataIdFromObject(object)+':'+object.fieldType+':'+object.fieldId; //can be deleted
            //case 'MessagesConnection': console.log(object);return 1;//defaultDataIdFromObject(object)+':'+moment(new Date(object.date)).format("YYYY-MM-DD"); // use `key` as the primary key
            case 'TrackerUnit': return (object.id === unitId ? 'TrackerUnit'+object.name : defaultDataIdFromObject(object)); // use `blah` as the priamry key
            case 'FormField': return  (object.id === '' ? null : defaultDataIdFromObject(object)); // use `blah` as the priamry key
            case 'FormFieldOption': return  null;//(object.id === '' ? null : defaultDataIdFromObject(object)); // use `blah` as the priamry key
            case 'FormFieldReport': return  null;//(object.id === '' ? object.__typename+':'+object.fieldCode : defaultDataIdFromObject(object)); // use `blah` as the priamry key
            default: return defaultDataIdFromObject(object);//.__typename+':'+object.id;// || object._id; // fall back to `id` and `_id` for all other types
        }
    },
    /*cacheResolvers: {
        Query: {
            TrackerReport: (_, args) => {console.log(args)},
            MedicationReport: (_, args) => {

                console.log(args)
            },
        },
    },*/
});

const defaultOptions = {
    /*watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
    },*/
    query: {
        fetchPolicy: 'cache-and-network',
        //fetchPolicy: 'cache-first',
        errorPolicy: 'all',
    },
    mutate: {
        errorPolicy: 'all',
    },
};

const link = ApolloLink.from([
    cleanTypenameLink,
    // afterwareLink,
    authLink,
    errorLink,
    httpLink
    
]);

const apolloClient = new ApolloClient({
    link: link,//authLink.concat(httpLink),
    cache: cache,
    connectToDevTools:useDevTools,
    defaultOptions
});

export default apolloClient;



