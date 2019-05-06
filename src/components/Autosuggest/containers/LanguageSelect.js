import LanguageSelectPure from '../components/LanguageSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_LANGUAGES_QUERY = gql`
    query GET_LANGUAGES {
        staticContent {
            languages {
                value
                label
            }
        }
    }
`;

const withQuery = graphql(GET_LANGUAGES_QUERY,
    {
        // options: (ownProps) => {
        //     const {cohort, patient} = ownProps;
        //     const {id:cohortId} = cohort || {};
        //     const {id:userId} = patient || {};
        //     return {
        //         fetchPolicy: 'network-only',
        //         variables: {
        //             // userId:userId,
        //             cohortId:cohortId,
        //             search:null,
        //         }
        //     }
        // },
        props: ({ data }) => {
                const {staticContent} = data;
                const {languages=[]} = staticContent || {};
                const items = languages.map(l => {
                    const {value, label} = l;
                    return {id: value, title:label};
                })
                return {
                    items,
                    loading: data.loading,
                    // doSearch(search) {
                    //     return data.refetch({
                    //         search: search
                    //     });
                    // }
                }
        },

    }
);

export const LanguageSelect = withQuery(LanguageSelectPure);