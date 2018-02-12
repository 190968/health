/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Promises from '../components/Promises';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const PROMISES  = gql`
query GET_PROMISES($cursors:CursorInput) {
account{
  user{
    id
    motivation{
     promises(cursors:$cursors){
      totalCount
      edges{
        id
        date
        type
        url
        description
        sender{
          id
          firstName
        }
      }
      }
    }
  }
}
}
`;

const withMutation = graphql(PROMISES, {
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Promises));