/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react'
import { connect } from 'react-redux'


/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import ForgotForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const forgotPasswordConfirm = gql`
    mutation forgotPasswordConfirm($code:String!,$new_password:String!,$new_password_repeat:String!) {
       forgotPasswordConfirm(code:$code,new_password:$new_password,new_password_repeat:$new_password_repeat
      )
    }
`;

const withMutation = graphql(forgotPasswordConfirm, {
    props: ({ mutate }) => ({
        forgotPasswordConfirm: input => {
            return mutate({
                variables: { code: input.code, new_password: input.new_password,new_password_repeat:input.new_password_repeat },
            })
        },
    }),
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props,code) => {
        const{new_password,new_password_repeat} = props;
        ownProps.forgotPasswordConfirm({ code:code, new_password:new_password,new_password_repeat:new_password_repeat})
            .then(({data}) => {
                console.log(data);
            }).catch((error) => {

        });
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(ForgotForm));






