import CategorySelect from '../components/CategorySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const CategorySelectQUERY = gql`
    query GET_CANCERS_LIST ($search: String)  {
        health {
            getCancersList (search: $search) {
                id,
                title
            }
        }
    }
`;

const CategorySelectWithQuery = graphql(CategorySelectQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.health.getCancersList,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(CategorySelect);

export default CategorySelectWithQuery;