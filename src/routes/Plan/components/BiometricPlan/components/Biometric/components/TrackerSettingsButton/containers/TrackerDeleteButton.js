import TrackerDeleteButtonPure from '../components/TrackerDeleteButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import { Modal, message } from 'antd';
import { GET_BIOMETRIC_PLAN_QUERY } from '../../../../../../../containers/BiometricPlan';

const confirm = Modal.confirm;

const TRACKER_DELETE_MUTATION = gql`
	mutation medicationDelete($id: UID!, $uid: UID!) {
		trackerDelete(id: $id, uid: $uid)
	}
`;

const withMutation = graphql(TRACKER_DELETE_MUTATION, {
	props: ({ ownProps, mutate }) => ({
		trackerDelete: () => {
			const { tracker, user, date } = ownProps;
			const { id } = tracker || {};
			const { id: userId } = user;
			return mutate({
				variables: { uid: userId, id },

				refetchQueries: [
					{
						query: GET_BIOMETRIC_PLAN_QUERY,
						variables: { userId, date }
					}
				]

				/*update: (store, { data: { medicationDelete } }) => {
                    // Read the data from our cache for this query.
                    const data = store.readQuery({ query: deleteMed });


                    // Add our comment from the mutation to the end.
                    //data.comments.push(medicationDelete);
                    // Write our data back to the cache.
                    //store.writeQuery({ query: CommentAppQuery, data });
                },*/
			});
		}
	})
});

const enhance = compose(
    withMutation,
    withHandlers({
        trackerDeleteConfirm: props => (e) => {
            e.stopPropagation();
            const conf = confirm({
                title: 'Are you sure you want to Archive this Tracker?',
                // content: 'Some descriptions',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk(e) {
                    const hide = message.loading('Deleting..', 0);
                  props.trackerDelete().then(()=> {
                    hide();
                    conf.destroy();
                    
                  });
                 
                },
                // onCancel() {
                //   console.log('Cancel');
                // },
              });
            
        }
    })
);
export const TrackerDeleteButton = enhance(TrackerDeleteButtonPure);
export default TrackerDeleteButton;