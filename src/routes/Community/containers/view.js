
/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react'
import { connect } from 'react-redux'


import View from '../components/CategoriesLayout/components/View';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORY  = gql`
query GET_CATEGORY($id:ID) {

       category(id:$id) {
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
const categoryJoinMutate=gql`
mutation CATEGORY_JOIN ($id:ID!,$uid:ID){
    categoryJoin(id:$id,uid:$uid)
  }

`;
const withQuery = graphql(CATEGORY, {

        options: (ownProps) => {
            return{
        variables: {
            id: ownProps.match.params.id,
            handleBreadcrumbChange:ownProps.handleBreadcrumbChange
        }}
    },
        props: ({ ownProps, data }) => {

        if (!data.loading) {
            return {
                info: data.category
                ,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },

})(View);

const withMutation = graphql(categoryJoinMutate, {
    props: ({ mutate }) => ({
        updateInfo: id => {
            return mutate({
                variables: {id:id},
            })},
    }),
});

const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (id) => {
        ownProps.updateInfo(id).then(({data}) => {
            console.log("----categoryJoinMutate----");
            console.log(data);
        })
    },
});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));
