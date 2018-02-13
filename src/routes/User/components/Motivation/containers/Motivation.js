/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Motivators from '../index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const ADHERENCESUMMARY  = gql`
  query GET_ADHERENCESUMMARY {
  account {
    user {
      id
      motivation {
        adherenceSummary {
          medications {
            level
            color
            description
          }
          trackers {
            level
            color
            description
          }
          plans {
            level
            color
            description
          }
        }
      }
    }
  }
}

`;

const withMutation = graphql(ADHERENCESUMMARY, {
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Motivators));