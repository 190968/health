import NotificationListItemPure from '../components/NotificationListItem';
import { compose, withHandlers } from 'recompose';
import { withRouter} from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { NOTIFICATIONS_QUERY } from '../../../../../../components/Notifications/queries';



const HANDLE_NOTIFICATION_MUTATION = gql`
mutation HANDLE_NOTIFICATION($id: UID!, $approved: Boolean!) {
  handleNotification(id: $id, approved: $approved) {
    id
    action
    actionId
    userId
    date
  }
}
`;

const withMutation = graphql(HANDLE_NOTIFICATION_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        handleNotification: (approved) => {
            return mutate({
                variables: { id: ownProps.notification.id, approved: approved },
                refetchQueries: [
                    {
                        query: NOTIFICATIONS_QUERY,
                        variables: { cursors: { after: '' } }
                    }
                ],
            })
        },
    }),
});


const enhance = compose(
    withMutation,
    withRouter,
    withHandlers({
        handleNotification: props => (approved) => {
            props.handleNotification(approved).then(({ data }) => {

                if (!approved) {
                    return;
                }
                const { history } = props;
                // check on notification
                let {
                    action,
                    actionId,
                    userId,
                    date } = data.handleNotification;
                    
                    if (date) {
                        date = moment(date).format('Y-m-d');
                    }

                switch (action) {
                    default: break;
                    case 'goUser':
                        //'description' => 'Go to user profile by User ID'
                        history.push('/u/' + userId);
                        break;
                    case 'goUserPlan':
                        //'description' => 'Go to user Plan by User Plan ID'
                        history.push('/plan/' + actionId);
                        break;
                    case 'goPlanstorePlan':
                        //'description' => 'Go to planstore plan by Plan ID'
                        history.push('/planstore/plan/' + actionId);
                        break;
                    case 'getUserPlan':
                        // 'description' => 'Get User plan By User Plan ID. Show page where we can get plan by User Plan ID. REQUEST ID IS MANDATORY TO PASS'
                        break;
                    case 'goPlanBuilderPlan':
                        // 'description' => 'Go to plan builder plan by Plan ID'
                        history.push('/pb/' + actionId);
                        break;
                    case 'getPlan':
                        // 'description' => 'Get Plan by Plan ID.  REQUEST ID IS MANDATORY TO PASS'
                        history.push('/planstore/plan/' + actionId + '/#download');
                        break;
                    case 'goBiometricPlan':
                        // 'description' => 'Go to biometric plan by User ID'
                        history.push('/u/' + userId + '/biometric/#date=' + date);
                        break;
                    case 'goMedicationPlan':
                        // 'description' => 'Go to medication plan by User ID'
                        history.push('/u/' + userId + '/medication/#date=' + date);
                        break;
                    case 'goAssessment':
                        //  'description' => 'Go to assessment by ID'
                        history.push('/assessment/' + actionId);
                        break;
                    case 'goReferral':
                        history.push('/referral/' + actionId);
                        break;
                    case 'goDiscussion':
                        history.push('/community/discussion/' + actionId);
                        break;
                    case 'goComment':
                        history.push('/community/discussion/comment/' + actionId);
                        break;
                    case 'goCalendar':
                        history.push('/calendar');
                        break;
                    case 'goTask':
                        history.push('/tasks/' + actionId);
                        break;
                    case 'goHealth':
                        history.push('/u/' + userId + '/health');
                        break;
                    case 'goTransition':
                        // 'description' => 'Go to Transition by User ID and ID'
                        history.push('/u/' + userId + '/transition');
                        break;
                    case 'goDME':
                        history.push('/dme/' + actionId);
                        break;
                    case 'goPromise':
                        history.push('/u/' + userId + '/promises/' + actionId);
                        break;
                    case 'goCommitment':
                        history.push('/u/' + userId + '/commitments/' + actionId);
                        break;
                    case 'goMedication':
                        // 'description' => 'Go to Medication by ID and User ID'
                        history.push('/u/' + userId + '/medication/#' + actionId + '&date=' + date);
                        break;
                    case 'goTracker':
                        // 'description' => 'Go to Tracker by ID and User ID'
                        history.push('/u/' + userId + '/biometric/#' + actionId + '&date=' + date);
                        break;
                }
            });
        }
    }),
    withHandlers({
        onAccept: props => (e) => {
            e.preventDefault();
            props.handleNotification(true);
        },
        onDecline: props => (e) => {
            e.preventDefault();
            props.handleNotification(false);
        }
    })
);
export const NotificationListItem = enhance(NotificationListItemPure);