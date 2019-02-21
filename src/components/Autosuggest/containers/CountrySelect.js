import CountrySelectPure from '../components/CountrySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CountryInfoFragment } from '../../FormCustomFields/components/Address/fragments';

export const COUNTRIES_QUERY = gql`
    query GET_COUNTRIES {
        staticContent {
            countries {
                ...CountryInfo
            }
        }
    }
    ${CountryInfoFragment}
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
            const {countries=[]} = staticContent || {};
            return {
                items: countries,
                loading: data.loading,
            }
        },

    }
)

export const CountrySelect = withQuery(CountrySelectPure);
export default CountrySelect;