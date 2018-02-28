import PlanLesson from '../components/PlanLesson'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnLesson = gql`
    mutation lessonReport($id: UID!, $upid: UID!) {
        lessonComplete(id:$id, upid: $upid) {
             id
             completed
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        lessonReport: (upid, id) => {
            return mutate({
                variables: { upid:upid, id: id },
            })
        },

    }),
});


export default withMutation(PlanLesson);
