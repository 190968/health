/**
 * Created by Pavel on 09.12.2017.
 */
import { connect } from 'react-redux'
import React from 'react'

import {
    Redirect,
} from 'react-router-dom'
import VerifyPhoneConfirm from '../containers/verifyPhoneConfirmContainer';
/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import VerifyPhoneForm from '../components/VerifyPhone'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const verifyPhone = gql`
   mutation verifyPhone($phone:Phone!) {
       verifyPhone(phone:$phone)
    }
`;
const getPhone = gql`
   query getPhone {
    account
    {
      user {
          id
            phone
      }
    }
}
`;

const withMutation = graphql(verifyPhone, {
    props: ({ mutate }) => ({
        verifyPhone: ({prefix, phone}) => {
            return mutate({
                variables: {phone:[prefix,phone]},
            })},
    }),
});

const withQuery = graphql(getPhone,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //console.log(data.account);
                return {
                    phone: data.account.user.phone,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(VerifyPhoneForm);


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props,showCode) => {
        const{phone,prefix} = props;
        ownProps.verifyPhone({prefix,phone})
            .then(({data}) => {

                if(data.verifyPhone){
                    showCode();
                }

            }).catch((error) => {
            console.log(error);
        });
    },
});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));


//export default withMutation(connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneForm));
