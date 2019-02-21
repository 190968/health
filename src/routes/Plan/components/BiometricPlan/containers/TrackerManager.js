import TrackerManagerPure from '../components/TrackerManager';
import { compose, withHandlers, withProps, branch, renderComponent, withState } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { message, Form } from 'antd';
import { GET_BIOMETRIC_PLAN_QUERY } from '../../../containers/BiometricPlan';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../components/Modal';
import TrackerSelect from '../../../../../components/Autosuggest/containers/TrackerSelect';
import { withLoadingButton } from '../../../../../components/Loading';
import { UserInfoFragment } from '../../../../User/fragments';

const GET_TRACKER_QUERY = gql`
	query GET_TRACKER_QUERY($id: UID, $user_id: UID!, $amid: UID, $getTrackerInfo: Boolean!) {
		biometricPlan(userId: $user_id) {
			id
			columns {
				id
				name
				createdBy {
					...UserInfo
				}
			}
		}
		tracker(id: $id, userId: $user_id) @include(if: $getTrackerInfo) {
			id
			measurement(amid: $amid) {
				id
				label
				units {
					id
					name
				}
				inputMask
				graph
			}
			criticalRange {
				min
				max
			}
			normalRange {
				min
				max
			}
			timesToReport
			columns
			startDate
			endDate
		}
	}
	${UserInfoFragment}
`;

const withQuery = graphql(GET_TRACKER_QUERY, {
	options: (ownProps) => {
		const {measurement, tracker} = ownProps;
		const {id:measurementId} = measurement || `[]`;
		const {id} = tracker || {};
		return {
			variables: {
				user_id: ownProps.user.id,
				id: id,
				amid: measurementId,
				getTrackerInfo: (measurementId !== '' || id !== '')
			},
			fetchPolicy: 'network-only'
		};
	},
	props: ({ ownProps, data }) => {
		if (!data.loading) {
			const {tracker} = data;
			return {
				tracker: tracker,
				columns: data.biometricPlan.columns,
				loading: data.loading
			};
		} else {
			return { loading: data.loading };
		}
	}
})


const ADD_TRACKER_MUTATION = gql`
	mutation TrackerAdd($userId: UID!, $input: TrackerInput!) {
		trackerAdd(userId: $userId, input: $input) {
			id
			measurement {
				id
				label
				graph
			}
			criticalRange {
				min
				max
			}
			normalRange {
				min
				max
			}
			timesToReport
			columns
		}
	}
`;

const withMutationAdd = graphql(ADD_TRACKER_MUTATION, {
	props: ({ ownProps, mutate }) => ({
		updateTracker: (input) => {
			return mutate({
				variables: { userId: ownProps.user.id, input: { details: input } },
				refetchQueries: [
					{
						query: GET_BIOMETRIC_PLAN_QUERY,
						variables: { userId: ownProps.user.id, date: ownProps.date }
					}
				]
			});
		}
	})
});

const UPDATE_TRACKER_MUTATION = gql`
	mutation TrackerUpdate($id: UID, $userId: UID!, $input: TrackerInput!) {
		trackerUpdate(id: $id, userId: $userId, input: $input) {
			id
			measurement {
				id
				label
				graph
			}
			criticalRange {
				min
				max
			}
			normalRange {
				min
				max
			}
			timesToReport
			columns
		}
	}
`;


const withMutationEdit = graphql(UPDATE_TRACKER_MUTATION, {
	props: ({ ownProps, mutate }) => ({
		updateTracker: (input) => {
			console.log(ownProps);
            const {tracker, user} = ownProps;
			const {id} = tracker || {};
			return mutate({
				variables: { id: id, userId: user.id, input: { details: input } },
				refetchQueries: [
					{
						query: GET_BIOMETRIC_PLAN_QUERY,
						variables: { userId: ownProps.user.id, date: ownProps.date }
					}
				],
				// update: (store, { data: { trackerUpdate } }) => {
				// 	// Read the data from our cache for this query.
				// 	/*const data = store.readQuery({
                //         query: tracker,
                //         variables: {
                //             id: id,
                //             user_id: uid
                //         }
                //     });*/
				// 	if (id) {
				// 		// add new to the list
				// 	}

				// 	// Add our comment from the mutation to the end.
				// 	//data = medicationUpdate;
				// 	// Write our data back to the cache.
				// 	if (trackerUpdate.id) {
				// 		store.writeQuery({
				// 			query: GET_TRACKER_QUERY,
				// 			data: { tracker: trackerUpdate },
				// 			variables: {
				// 				id: trackerUpdate.id,
				// 				user_id: ownProps.user.id
				// 			}
				// 		});
				// 	} else {
				// 		store.writeQuery({
				// 			query: GET_TRACKER_QUERY,
				// 			data: { tracker: trackerUpdate },
				// 			variables: {
				// 				id: id,
				// 				user_id: ownProps.user.id
				// 			}
				// 		});
				// 	}
				// }
			});
		}
	})
});



const SelectTrackerDrawer = compose(
    withProps((props) => {
		return {
			modalTitle: 'Select Tracker',
            modalWidth: 600,
            getSelectedInfo:true
		};
	}),
    withDrawer,
    withSpinnerWhileLoading,
    withHandlers({
        onChange: props => item => {
            props.setMeasurement(item);
        }
    })
)(TrackerSelect);

const withAdd = compose(
	withQuery,
	branch(props => !props.measurement, renderComponent(SelectTrackerDrawer)),
    withMutationAdd, 
);
const withEdit = compose(withQuery, withMutationEdit);

const enhance = compose(
    withState('measurement', 'setMeasurement', props => {
        const {tracker} = props;
        const {measurement} = tracker || {};
        return measurement;
    }),
    branch((props) => props.tracker, withEdit, withAdd),
	withProps((props) => {
        const {measurement} = props;
        const {label} = measurement || {};
		const modalTitle = props.tracker ? 'Edit ' + label : 'Add '+label;
		return {
			modalTitle,
			modalWidth: 600
		};
	}),
	withLoadingButton,
    Form.create(),
    withDrawer,
    withSpinnerWhileLoading,
    withHandlers({
        handleSubmit: props => (e) => {
            e.preventDefault();
            const { form, measurement, updateTracker } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const {
                        criticalRangeMin,
                        criticalRangeMax,
                        normalRangeMin,
                        normalRangeMax,
                        attachDiagnoses,
                        timesToReport,
                        graph,
                        columns,
                        startDate,
                        endDate
                    } = values;

                    const startDateYMD = startDate.format('YYYY-MM-DD');
                    const endDateYMD = endDate ? endDate.format('YYYY-MM-DD') : '';
                    const input = {
                        amid: measurement.id,
                        graph: graph,
                        timesToReport: timesToReport,
                        criticalRange: { min: criticalRangeMin, max: criticalRangeMax },
                        normalRange: { min: normalRangeMin, max: normalRangeMax },
                        columnsFull:columns,
                        icd10Codes: attachDiagnoses,
                        startDate: startDateYMD,
                        endDate: endDateYMD
					};
					
					props.setLoadingButton(true);
					const hide = message.loading('Saving...');
                    updateTracker(input).then((data) => {
						props.setLoadingButton(false);
						props.onHide();
						hide();
                        message.success('Saved');
                    });
                }
            });
        }
    })

);
export const TrackerManager = enhance(TrackerManagerPure);
