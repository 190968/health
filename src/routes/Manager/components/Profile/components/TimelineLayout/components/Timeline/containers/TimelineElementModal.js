import TimelineElementModal from '../components/TimelineElementModal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_TIMELINE_QUERY } from '../../../queries';
import { TimelineElementFragment } from '../../../timeline_fragments';
import { GET_USER_PATHWAY_QUERY } from '../../../../Pathway/containers/PathwayContent';
import { GET_USER_PATHWAY_WITH_REPORTS_QUERY } from '../../../../Pathway/containers/PathwayBody';

const addTimelineElementMutation = gql`
    mutation addTimelineElement($userId: UID!, $type: TimelineElementEnum!, $input: TimelineInput!){
        addTimelineElement(userId:$userId, type:$type, input:$input) {
            ...TimelineElement
        }
    }
    ${TimelineElementFragment}
`;

const withMutation = graphql(addTimelineElementMutation, {
    props: ({ ownProps, mutate }) => ({
        submitTimelineElement: (input) => {
            const type = ownProps.type || ownProps.element.type;
            let refetchQueries = [{
                query: GET_TIMELINE_QUERY,
                variables: { userId: ownProps.user.id},
            }];

            const {sourceInfo} = input;
            if (sourceInfo) {
                refetchQueries.push({
                    query: GET_USER_PATHWAY_WITH_REPORTS_QUERY,
                    variables: { userId: ownProps.user.id},
                });
            }

            return mutate({
                variables: { userId: ownProps.user.id, type, input: input},
                refetchQueries
            })
        },

    }),
});

export default withMutation(TimelineElementModal);//withQuery(Pathway);


const updateTimelineElementMutation = gql`
    mutation updateTimelineElement($id: UID!, $userId: UID!, $input: TimelineInput!){
        updateTimelineElement(id:$id, userId:$userId, input:$input) {
            ...TimelineElement
        }
    }
    ${TimelineElementFragment}
`;

 const withUpdateTimelineElementMutation = graphql(updateTimelineElementMutation, {
    props: ({ ownProps, mutate }) => ({
        submitTimelineElement: (input) => {
            //console.log(ownProps);
            return mutate({
                variables: { id: ownProps.item.id, userId: ownProps.user.id, input: input},
            })
        },
    }),
});

export const TimelineElementModalWithMutation = withUpdateTimelineElementMutation(TimelineElementModal);