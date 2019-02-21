import FollowUpPure from '../components/FollowUp';
import {compose, withProps, branch, withHandlers} from 'recompose';
import {Form} from 'antd';
import { withModal, withDrawer } from '../../../../../../../components/Modal';
import moment from 'moment';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../User/fragments';
import { VisitInfoFragment } from '../fragments';
import { GET_TIMELINE_QUERY } from '../../TimelineLayout/queries';
import { TransitionInfoFragment } from '../../Transitions/queries';
import { withPatientSelectIfNeededModal } from '../../../../../../../components/Autosuggest/containers/PatientSelect';
import { CalendarEventInfoFragment } from '../../../../../../Calendar/fragments';



 

export const TRANSITION_QUERY = gql`
    query GET_CHEMOTHERAPY ($id: UID!) {
        patient {
            getTransition(id:$id) {
                ...TransitionInfo
                getPeopleToAlert {
                    ...UserInfo
                }
            }
        }
    }
    ${TransitionInfoFragment}
    ${UserInfoFragment}
`;

// 1- add queries:
const withQuery = graphql(
    TRANSITION_QUERY,
    {
        options: ({transition}) => {
            return {
                variables: {
                    id: transition.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {health={}} = data;
            const {getChemotherapy=ownProps.chemotherapy} = health;
            return {...ownProps, loading: data.loading, chemotherapy:getChemotherapy}
        },
    }
);


const TRANSITION_UPDATE_MUTATION = gql`
    mutation TRANSITION_UPDATE($id: UID!, $input:UserTransitionInput!){
        updateTransition(id:$id, input:$input) {
            ...TransitionInfo
        }
    }
    ${TransitionInfoFragment}
`;


const withMutationEdit = graphql(TRANSITION_UPDATE_MUTATION, {
    props: ({ownProps:{transition}, mutate }) => ({
        onSubmit: (input) => {
            return mutate({variables: { id: transition.id, input: input}});
        },
    }),
});
const withQueryMutation = compose(withMutationEdit, withQuery);


const CREATE_FOLLOW_UP_MUTATION = gql`
    mutation createFollowUp($userId: UID!,$input:FollowUpInput!){
        createFollowUp(userId:$userId, input:$input) {
            id
                title
                dateTime
                user {
                    ...UserInfo
                }
                isAccepted
        }
    }
    ${UserInfoFragment}
`;

const withAddMutation = graphql(CREATE_FOLLOW_UP_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            onSubmit: (input) => {
                const {patient={}} = ownProps;
                return mutate({
                    variables: {input, userId:patient.id},
                    // refetchQueries: [{
                    //     query: GET_TIMELINE_QUERY,
                    //     variables: {userId: patient.id},
                    // }],
                });
            },
        }
    }
});



const enhance = compose(
    withPatientSelectIfNeededModal,
    branch(props => props.visit, withQueryMutation, withAddMutation),
    Form.create(),
   
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                // console.log(values);
                if (!err) {
                    props.onSubmit(values).then(({data})=> {
                        props.onHide();
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        },
        disabledDate: props => (current) => {
            // Can not select days before today and today
            return current && current < moment().startOf('day');
        },
    }),
    withProps(props => {
        const {patient} = props;
        const modalTitle = 'Create the Follow Up with '+patient.fullName;
        return {
            modalTitle
        }
    }),
    withDrawer
);
export const TransitionManager = enhance(FollowUpPure);
export default TransitionManager;