
/**
 * Created by Pavel on 10.01.2018.
 */

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CategoryNews from '../components';


const MY_CATEGORIES = gql`
  query GET_MAINCATEGORIESNEWS {
  getMainCategoriesNews{
    totalCount
    edges{
      id
      title
      text
      createdAt
      thumb
      sourceTitle
      sourceUrl
    }
  }
}
`;

const withQuery = graphql(MY_CATEGORIES, {
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            return {
                info: data.getMainCategoriesNews,
                loading: data.loading
            }
        }
        else {
            return { loading: data.loading }
        }
    },
});


export default withQuery(CategoryNews);