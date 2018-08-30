import FollowUpPure from '../components/FollowUp';
import {compose, withProps, branch, withHandlers} from 'recompose';
import {Form} from 'antd';
import { withModal } from '../../../../../../../components/Modal';


import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../User/fragments';




export const TransitionInfoFragment = gql`
        fragment TransitionInfo on UserTransition {
            id
            transitionType:type
            typeTxt
            dateTime
            alertEntireTeam
        }
`;

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
    mutation createFollowUp($userId: UID!,$input:VisitInput!){
        createFollowUp(patientId:$userId, input:$input) {
            id
        }
    }
`;

const withAddMutation = graphql(CREATE_FOLLOW_UP_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            onSubmit: (input) => {
                const {patient={}} = ownProps;
                return mutate({
                    variables: {input, userId:patient.id},
                });
            },
        }
    }
});



const enhance = compose(
    branch(props => props.visit, withQueryMutation, withAddMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                console.log(values);
                if (!err) {
                    props.onSubmit(values).then(({data})=> {
                        props.onHide();
                    });
                }
            });
        },
    }),
    withProps(props => {
        const {patient} = props;
        const modalTitle = 'Create the Follow Up with '+patient.fullName;
        return {
            modalTitle
        }
    }),
    withModal
);
export const TransitionManager = enhance(FollowUpPure);
export default TransitionManager;