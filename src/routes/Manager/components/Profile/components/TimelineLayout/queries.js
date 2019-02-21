import gql from 'graphql-tag';
import { TimelineElementFragment } from './timeline_fragments';

export const GET_TIMELINE_QUERY = gql`
 query GET_TIMELINE($userId:UID!, $cursors:CursorInput, $filters:[String]) {
   getTimeline (userId: $userId, cursors: $cursors, filters:$filters ) {
        totalCount
        edges{
             ...TimelineElement
        }
        pageInfo {
            endCursor
        }
   }
}
${TimelineElementFragment}
`;