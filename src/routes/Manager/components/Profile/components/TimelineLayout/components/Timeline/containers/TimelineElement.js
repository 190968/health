import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TimelineElementPure from '../components/TimelineElement';
import {FieldReportFragment} from "../../../../../../../../Plan/components/Plan/fragments";
import { TimelineElementFragment } from '../../../timeline_fragments';
import { compose } from 'recompose';

const FIELD_REPORT_MUTATION = gql`
    mutation fieldReport($reportId: UID, $fieldId: UID!, $fieldType: String!, $optionId: [UID], $value: [String], $userId: UID) {
        fieldReport(reportId:$reportId, fieldId: $fieldId, fieldType: $fieldType, optionId:$optionId, value: $value, userId:$userId) {
            ...FieldReportInfo
        }
    }
    ${FieldReportFragment}
`;

export const GET_TIMELINE_ELEMENT_QUERY = gql`
    query GET_TIMELINE_ELEMENT($userId:UID, $id:UID!) {
    getTimelineElement (userId: $userId, id: $id ) {
            ...TimelineElement
            getReport {
                ...FieldReportInfo
            }
    }
    }
    ${TimelineElementFragment}
    ${FieldReportFragment}
`;


const withMutation = graphql(FIELD_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        handleReport: (value, fieldType) => {
            //console.log(ownProps, 'Treatment Props');
            const {item, user} = ownProps;
            const {activity:{id:fieldId}, getReport={}} = item || {};
            const {id:reportId} = getReport || {};
            const {id:userId} = user || {};
            const optionId = fieldType === 'checklist' && value;
            return mutate({
                variables: {reportId, fieldId, fieldType, value, optionId, userId},
                refetchQueries: [{
                    query: GET_TIMELINE_ELEMENT_QUERY,
                    variables: {id: item.id, userId },
                }],
            })
        },
    }),
});

export default withMutation(TimelineElementPure);




const withTimelineElementQuery = graphql(GET_TIMELINE_ELEMENT_QUERY, {
	options: (ownProps) => {
        console.log(ownProps);
        const {user, item} = ownProps;
        const {id:userId} = user || {};
        const {id} = item || {};
		return {
			variables: {
				userId,
				id
			}
            //fetchPolicy: 'network-only',
            //notifyOnNetworkStatusChange: false
		}
	},
	props: ({ ownProps, data }) => {
            const {item} = ownProps;
            const { getTimelineElement=item, loading } = data || {};
            return {item:getTimelineElement, loading};
	}
});

const enhance = compose(
    withTimelineElementQuery,
    withMutation
);
export const TimelineElement = enhance(TimelineElementPure);