/**
 * Created by Pavel on 08.01.2018.
 */
/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react'
import { connect } from 'react-redux'


/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import Motivators from '../components/Motivators';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const motivators = gql`
   query GET_MOTIVATORS {
        account {
            user {
            id
            motivators {
                  totalCount,
                  edges{
                    id,
                    user {
                      id,
                      firstName,
                      email
                    }
                  }
                }
            }
         }
     }
`;

const withMutation = graphql(motivators, {
    props: ({ ownProps, data }) => {
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Motivators));