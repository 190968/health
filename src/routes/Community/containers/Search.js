/**
 * Created by Павел on 17.01.2018.
 */

import React from 'react'
import { connect } from 'react-redux'
import Search from '../components/CategoriesLayout/components/View/components/Search';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORYSEARCH  = gql`
   query GET_CATEGORYSEARCH($search:String,$categoryId:ID) {
categorySearch(search:$search,categoryId:$categoryId)
  {
         id
         name
         thumb {
           original
           small
           large
           medium
           wide
         }
    		 canJoin
    		 isJoined
         articles {
           id
          title
          titleShort
          text
          category {
            id
            name
          }
          thumbs {
            original
            small
            large
            medium
            wide
          }
          views
         }
        discussions {
          id
          title
          text
          createdAt
          lastReplyAt
          category {
            id
          }
          views
        }
    categories {
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
 
  
}

`;

const withQuery = graphql(CATEGORYSEARCH, {

    options: (ownProps) => {
        console.log(ownProps);
              return{
            variables: {
                search:"Sex"
            }}
    },
    props: ({ ownProps, data }) => {
             console.log("CATEGORYSEARCH")
        if (!data.loading) {

            let keyValue = [];
            data.categorySearch.forEach((item)=>{
                keyValue.push(item.name);
            })

            return {
                category: keyValue,
                loading: data.loading,
                loadMoreEntries(inputValue) {
                    console.log("Какой inputValue в props",inputValue);
                    return data.fetchMore({

                        variables: {
                            search: inputValue,
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            console.log("Какой previousResult в updateQuery",previousResult);
                            if (!fetchMoreResult) { return previousResult; }
                            return fetchMoreResult;
                            return Object.assign({}, previousResult, {

                                category: previousResult
                            });
                        },
                    });
                }
            }
        }
        else {
            return {loading: data.loading}
        }
    },

});

const mapStateToProps = (state) => {
 console.log(state)
  //  var search = .planstore.get('search');

    return {
        search: "Sex",
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {
        console.log(values);

    },
});


export default withQuery(connect(mapStateToProps, mapDispatchToProps)(Search));