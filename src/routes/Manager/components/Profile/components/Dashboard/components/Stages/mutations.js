
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withTransitionQuery, TransitionInfoFragment } from './queries';
import {compose} from 'recompose';


const USER_STAGE_UPDATE_MUTATION = gql`
    mutation USER_STAGE_UPDATE($userId: UID!, $checklist:[UserStageChecklistInput], $status:UID, $date:Date, $time:Time){
        updateUserStage(userId:$userId, statusId:$status, date:$date, time:$time, checklist:$checklist) {
            id
            startDate
            stage {
                id
                getChecklist {
                    id
                    title
                }
            }
            isCurrent
        }
    }
`;


export const withUpdateUserStageMutation = graphql(USER_STAGE_UPDATE_MUTATION, {
    props: ({ownProps:{user}, mutate }) => ({
        updateUserStage: (props) => {
            return mutate({variables: { userId: user.id, ...props}});
        },
    }),
});
 