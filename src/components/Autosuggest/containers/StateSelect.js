import StateSelectPure from '../components/StateSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const COUNTRIES_QUERY = gql`
    query GET_COUNTRIES {
        staticContent {
            states {
                id
                name
            }
        }
    }
`;

const withQuery = graphql(COUNTRIES_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-first'
            }
        },
        props: ({ data }) => {

            const {staticContent} = data;
            const {states=[]} = staticContent || {};
            return {
                items: states,
                loading: data.loading,
            }
        },

    }
)

export const StateSelect = withQuery(StateSelectPure);
export default StateSelect;