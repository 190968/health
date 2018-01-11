
/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react'
import { connect } from 'react-redux'


import DiscussionsForm from '../components/CommunitiesDiscussions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORY  = gql`
query GET_CATEGORY ($id:ID) {
       category(id:$id) {
           discussions {
              id
              title
              text
            }
       }
}
`;

const withMutation = graphql(CATEGORY, {

        options: (ownProps) => ({
        variables: {
            id: ownProps.match.params.id
        },
    }),
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

});

const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(DiscussionsForm));
