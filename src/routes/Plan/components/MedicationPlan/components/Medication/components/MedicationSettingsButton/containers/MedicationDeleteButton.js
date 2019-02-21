import MedicationDeleteButtonPure from '../components/MedicationDeleteButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers } from 'recompose';
import { Modal, message } from 'antd';
import { GET_MEDICATION_PLAN_QUERY } from '../../../../../../../containers/MedicationPlan';

const confirm = Modal.confirm;

const deleteMed = gql`
	mutation medicationDelete($id: UID!, $uid: UID!) {
		medicationDelete(id: $id, uid: $uid)
	}
`;

const withMutation = graphql(deleteMed, {
	props: ({ ownProps, mutate }) => ({
		medicationDelete: () => {
			const { medication, user, date } = ownProps;
			const { id } = medication || {};
			const { id: userId } = user;
			return mutate({
				variables: { uid: userId, id },

				refetchQueries: [
					{
						query: GET_MEDICATION_PLAN_QUERY,
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
        medicationDeleteConfirm: props => () => {
            const {onFinish} = props;
            const conf = confirm({
                title: 'Are you sure you want to Archive this Medication?',
                 content: 'Medication will not be shown anywhere',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk(e) {
                    const hide = message.loading('Archiving..', 0);
                    props.medicationDelete().then(()=> {
                        hide();
                        if (onFinish) {
                            onFinish();
                          }
                     
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
export const MedicationDeleteButton = enhance(MedicationDeleteButtonPure);
export default MedicationDeleteButton;
