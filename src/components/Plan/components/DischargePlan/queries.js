
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { TaskAttachmentInfoFragment } from '../../../../routes/Manager/components/Tasks/fragments';
import { PatientInfoFragment } from '../../../../routes/User/fragments';
import { DischargePlanFragment } from './fragments';

const GET_DISCHARGE_PLAN_QUERY = gql`    
    query GET_DISCHARGE_PLAN($id: UID!) {
        getDischargePlan (id: $id) {
            ...DischargePlan
        }
    }
    ${DischargePlanFragment}
`;

export const withDischargePlanQuery = graphql(
    GET_DISCHARGE_PLAN_QUERY,
    {
        // skip: (props) =>  {
        //     const {id} = props.plan || {};
        //     return !id;
        // },
        options: (ownProps) => {
            const {dischargePlan} = ownProps;
            const {id} = dischargePlan || {};
            return {
                variables: {
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getDischargePlan} = data || {};
            return {
                dischargePlan: getDischargePlan,
                loading: data.loading,
            }
        },
    }
);