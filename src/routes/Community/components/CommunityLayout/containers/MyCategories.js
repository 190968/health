import MyCategories from '../components/MyCategories';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const MY_CATEGORIES = gql`
   query GET_MY_CATEGORIES {
        account {
            user {
            id
            categories
            {
              id
              category {
                id 
                name
                thumb {
                  large
                  original
                  small                  
                  medium
                  wide
                }
               
              }
            }
            }
     }
}
`;

const withQuery = graphql(MY_CATEGORIES, {
    props: ({ ownProps, data }) => {

        if (!data.loading) {
            return {
                info: data.account.user.categories,
                loading: data.loading
            }
        }
        else {
            return { loading: data.loading }
        }
    },
});


export default withQuery(MyCategories);