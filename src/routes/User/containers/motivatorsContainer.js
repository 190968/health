/**
 * Created by Pavel on 08.01.2018.
 */
/**
 * Created by Pavel on 08.12.2017.
 */
//import React from 'react'
import { connect } from 'react-redux'

import { message } from 'antd';
/*  This is a container components. Notice it does not contain any JSX,
 nor does it import React. This components is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 components - in this case, the counter:   */

import Motivators from '../components/Motivators';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from "react-router-dom";

const motivators = gql`
   query GET_MOTIVATORS {
        account {
            user {
            id
                motivation{
            motivators {
                  totalCount,
                  edges{
                    id,
                    user {
                      id,
                      firstName,
                      fullName,
                      email
                    }
                  }
                }
            }}
         }
     }
`;

const motivatorInvite = gql`
   mutation motivatorInvite($userId:UID!,$email:Email!,$message:String) {
        motivatorInvite(userId:$userId,email:$email,message:$message) {
            id
        }
}
`;

const withQuery = graphql(motivators, {
    props: ({ data }) => {
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
})(Motivators);

const withMutation = graphql(motivatorInvite, {
    props: ({ mutate }) => ({
        motivatorInvite: (input,userID) => {
            return mutate({
                variables:  {
                    userId: userID,
                    email:  input.email,
                    message: input.text
                } ,
            })
        },
    }),
});
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (value, handleCancel) => {
        ownProps.motivatorInvite(value,ownProps.user_id).then(({data}) => {
            message.success('Invited');
            handleCancel();
        })
    },
});

export default withRouter(withMutation(connect(mapStateToProps, mapDispatchToProps)(withQuery)));

