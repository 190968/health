
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ifPageExists } from '../../../components/App/app-context';
import CommunityLayout from '../components/CommunityLayout';

const CATEGORIES  = gql`
   query GET_MAIN_CATEGORIES {
       getMainCategories {
         id
        name
        description
        thumb {
          original
          small
          large
          medium
          wide
        }
    }
}
`;
const withQuery = graphql(CATEGORIES, {
    props: ({ ownProps, data }) => {
        const {getMainCategories} = data || {}
        return {
            info: getMainCategories,
            loading: data.loading
        }
    },
});
 
export default ifPageExists('community')(withQuery(CommunityLayout));