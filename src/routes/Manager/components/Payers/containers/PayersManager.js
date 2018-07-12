import PayersManager from '../components/PayersManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form, message} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";
import { GET_NETWORK_MANAGERS_LIST } from '../../../containers/NetworkManager';


const INVITE_STAFF_MUTATION = gql`
    mutation InviteStaff($role: RoleEnum!, $input:InviteEmailsInput!){
        networkStaffInvite(role:$role,input:$input) {
            sent
            failed
        }
    }
`;

const withMutation = graphql(INVITE_STAFF_MUTATION, {
    props: ({mutate, ownProps}) => {
        const {role = 'manager'} = ownProps;
        let QUERY_EXECUTE = null;
        // use different queries depending on the role. switch or if-else should be here
        if (role === 'manager') {
            QUERY_EXECUTE = GET_NETWORK_MANAGERS_LIST;
        }
        return {
            onSubmit: (input) => {
                return mutate({
                    variables: {input, role},
                    refetchQueries: [{
                        query: QUERY_EXECUTE,
                        variables: {role}
                    }],
                });
            },
        }
    }
});

const enhance = compose(
    withMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    const input = values;
                    props.onSubmit(input).then(({data})=> {
                        const {networkStaffInvite={}} = data;
                        const {sent=0, failed=0} = networkStaffInvite;
                        message.success('Succesfully Sent: '+sent);
                        if (failed > 0) {
                            message.error('Failed: '+failed);
                        }
                        props.onHide();
                    });
                }
            });
        },
    }),
    withProps(props => {
        return {modalTitle: 'Add a Program'}
    }),
    withModal
);

export default enhance(PayersManager);