/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Commitments from '../components/Commitments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const COMMITMENTS  = gql`
 query GET_COMMITMENTS($cursors:CursorInput) {
account{
  user{
    id
    motivation{
     commitments(cursors:$cursors){
      totalCount
      edges{
        id
        motivators{
          id
          user{
            id
            firstName
          }
          email
        }
        date
        donate
        payment
        url
        description
      }
      }
    }
  }
}
}
`;

const withMutation = graphql(COMMITMENTS, {
    props: ({ ownProps, data }) => {
        console.log(data);
        if (!data.loading) {
            return {
                info: data.account.user.motivation,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Commitments));