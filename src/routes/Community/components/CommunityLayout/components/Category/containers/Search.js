import Search from '../components/Search';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORYSEARCH  = gql`
   query CATEGORY_SEARCH($search:String) {
        categorySearch(search:$search) {
             id
             name
        }
}

`;

const withQuery = graphql(CATEGORYSEARCH, {

    options: (ownProps) => {
        return{
            variables: {
                search:ownProps.search
            }
        }
    },
    props: ({  data }) => {
        if (!data.loading) {

            let keyValue = [];
            const {categorySearch=[]} = data;
            if (categorySearch) {
                categorySearch.forEach((item)=>{
                    keyValue.push({value:item.id, text:item.name});
                })
            }

            return {
                items: keyValue,
                loading: data.loading,
                loadMoreEntries(inputValue) {
                    return data.refetch({search: inputValue})
                }
            }
        }
        else {
            return {loading: data.loading}
        }
    },

});


export default withQuery(Search);