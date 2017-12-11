/**
 * Created by Pavel on 09.12.2017.
 */
import { connect } from 'react-redux'

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

const withMutation = graphql(verifyPhone, {
    props: ({ mutate }) => ({
        verifyPhone: input => {
            return mutate({
                variables: {phone:[input.phone,input.prefix] },
            })},
    }),
});

const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{phone,prefix} = props;
        ownProps.verifyPhone({phone:[prefix,phone] })
            .then(({data}) => {
                console.log("----verifyPhone----");
                console.log(data);
            }).catch((error) => {
            console.log(error);
        });
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneForm));
