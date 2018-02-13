/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import ModalMakeCommitment from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const GET_PLANS  = gql`
query GET_PLANS($user_id:ID) {
 user (id:$user_id) {
            id
            plans {
                upid
              title
              description              
                progress
            }
        }
}
`;

const withMutation = graphql(GET_PLANS, {
    options: (ownProps) => ({

        variables: {
            user_id: 24038
        }

    }),
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            return {
                info: data.user.plans,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ModalMakeCommitment));