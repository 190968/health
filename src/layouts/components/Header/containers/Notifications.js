/**
 * Created by Павел on 20.01.2018.
 */

import React from 'react'
import { connect } from 'react-redux'

import Notifications from '../components/Notifications/index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const NOTIFICATIONS  = gql`
   query GET_NOTIFICATIONS{
  account{
    user{
    id
      notifications{
        totalCount,
        edges{
          id
          user {
            id
          }
          sender {
            id
            firstName
            color
          }
          patient {
            id
          }
          text
          isApproved
          dateSent
          isCritical
        }
      }
    }
  }
}
`;

const withQuery = graphql(NOTIFICATIONS, {
    props: ({ ownProps, data }) => {
        console.log(data);
        if (!data.loading) {
            return {
                info: data.account.user,
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

export default withQuery(connect(mapStateToProps, mapDispatchToProps)(Notifications));