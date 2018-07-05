import ProvidersManager from '../components/ProvidersManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form, message} from 'antd';
import gql from 'graphql-tag';
import { withModal } from '../../../../../../../components/Modal';
import { GET_PATIENT_PROVIDERS_QUERY } from '../../../containers/Providers';


const INVITE_STAFF_MUTATION = gql`
    mutation AttachUserToProvider($providerId: UID!, $role: RoleEnum, $userId:UID){
        attachUserToProvider(providerId:$providerId, role:$role, userId:$userId) {
            id
        }
    }
`;

const withMutation = graphql(INVITE_STAFF_MUTATION, {
    props: ({mutate, ownProps}) => {
        const {user={}}  = ownProps;
        const {id:userId}  = user;
        return {
            onSubmit: (providerId) => {
                return mutate({
                    variables: {providerId, userId},
                    refetchQueries: [{
                        query: GET_PATIENT_PROVIDERS_QUERY,
                        variables: {userId}
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
                    const {providerId} = values;
                    props.onSubmit(providerId).then(({data})=> {
                        const {networkStaffInvite=false} = data;
                        if (networkStaffInvite) {
                            message.success('Succes');
                        }
                        props.onHide();
                    });
                }
            });
        },
    }),
    withProps(props => {
        return {modalTitle: 'Add Provider'}
    }),
    withModal
);

export default enhance(ProvidersManager);