import CategorySelectPure from '../components/CategorySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

export const CategorySelectQUERY = gql`
    query GET_MAIN_CATEGORY($isMedical:Boolean) {
        getMainCategories(isMedical:$isMedical){
            id
            name
            # getChildrenCategories {
            #     id
            #     name
            # } 
        }
    }
`;



const withQuery = graphql(CategorySelectQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.getMainCategories,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
);




export const CategorySelect = withQuery(CategorySelectPure);
export default CategorySelect;