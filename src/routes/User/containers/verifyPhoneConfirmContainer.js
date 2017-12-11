/**
 * Created by Pavel on 09.12.2017.
 */
import { connect } from 'react-redux'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import VerifyPhoneConfirmForm from '../components/VerifyPhoneConfirm'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const verifyPhoneConfirm = gql`
mutation verifyPhoneConfirm($code:String!) {
       verifyPhoneConfirm(code:$code)
    }
`;

const withMutation = graphql(verifyPhoneConfirm, {
    props: ({ mutate }) => ({
        verifyPhoneConfirm: input => {
            return mutate({
                variables: {code:input.code },
            })},
    }),
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{code} = props;
        ownProps.verifyPhoneConfirm({code:code })
            .then(({data}) => {
                console.log("----verifyPhoneConfirm----");
                console.log(data);
                ownProps.history.push('/');
            }).catch((error) => {
            console.log(error);
        });
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneConfirmForm));

