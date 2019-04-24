import StaffMemberInvite from '../components/StaffMemberInvite'
import {graphql} from 'react-apollo';
import {compose, withProps, withHandlers} from 'recompose';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";

import {Form, message} from 'antd';


const INVITE_STAFF_MUTATION = gql`
    mutation InviteStaff($role: RoleEnum!, $input:InviteEmailsInput!){
        networkStaffInvite(role:$role,input:$input) {
            sent
            failed
        }
    }
`;

export const withInviteNetworkStaffMutation = graphql(INVITE_STAFF_MUTATION, {
    props: ({mutate, ownProps}) => {
        const {role = 'manager'} = ownProps;
        let QUERY_EXECUTE = null;
        // use different queries depending on the role. switch or if-else should be here
        if (role === 'manager') {
           // QUERY_EXECUTE = GET_NETWORK_MANAGERS_LIST;
        }
        return {
            onSubmit: (input) => {
                return mutate({
                    variables: {input, role},
                    // refetchQueries: [{
                    //     query: QUERY_EXECUTE,
                    //     variables: {role}
                    // }],
                });
            },
        }
    }
});

const enhance = compose(
    withInviteNetworkStaffMutation,
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
        const {role} = props;
        let roleFormatted = 'Staff Member';
        switch(role) {
            case 'manager':
            roleFormatted = 'Network Manager';
            break;
            case 'cm':
            roleFormatted = 'Care Manager';
            break;
            case 'supervisor':
            roleFormatted = 'Supervisor';
            break;
            case 'analyst':
            roleFormatted = 'Analyst';
            break;
            case 'employer':
            case 'support':
            roleFormatted = 'Support Staff Member';
            break;
        }
        return {modalTitle: 'Invite '+roleFormatted}
    }),
    withModal
);

export default enhance(StaffMemberInvite);