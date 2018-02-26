/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Badges from '../components/Badges';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const BADGES  = gql`
<<<<<<< HEAD
  query GET_BADGES($cursors:CursorInput,$userId: UID) {
=======
  query GET_BADGES($cursors:CursorInput,$userId:UID) {
>>>>>>> 527d3bff2ce86ef8ab529d164b43aec0e8901e04

  user(id: $userId){
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

`;

const withMutation = graphql(BADGES, {
    options: (ownProps) => ({

        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({ ownProps, data }) => {

        if (!data.loading) {
            return {
                info: data.user.motivation,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return{
        userId:state.user.info.id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Badges));