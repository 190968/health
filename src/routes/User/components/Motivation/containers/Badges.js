/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Badges from '../components/Badges';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const BADGES  = gql`
  query GET_BADGES($cursors:CursorInput) {
account{
  user{
  id
    motivation{
     badges(cursors:$cursors){
      totalCount
      edges{
        id
        dateReceived
        badge{
          id
          title
          description
          congratsMessage
          image
          amount
        }
      }
      }
    }
  }
}
}
`;

const withMutation = graphql(BADGES, {
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Badges));