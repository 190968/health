import MedicationManagerPure from '../components/MedicationManager';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { message, Form } from 'antd';
import { compose, withProps, branch, withState, withHandlers, renderComponent } from 'recompose';
import { GET_MEDICATION_PLAN_QUERY } from '../../../../../containers/MedicationPlan';
import { withSpinnerWhileLoading, withDrawer } from '../../../../../../../components/Modal';
import {MedicationSelect} from '../../../../../../../components/Autosuggest/containers/MedicationSelect';
import { withLoadingButton } from '../../../../../../../components/Loading';
import { DrugInfoFragment, MedicationCardInfo } from '../components/fragments';

const GET_MEDICATION_QUERY = gql`
	query GET_MEDICATION($user_id: UID!, $id: UID, $drugId: UID) {
		medication(id: $id, userId: $user_id) {
			id
			startDate
			endDate
			sideEffects
			purpose
			directions
			timesPerDay
			timesPerHour {
				id
				time
				quantity
			}
			type
			drug(id: $drugId) {
				id
				name
				dosage
			}
			quantity
		}
	}
`;

const withQuery = graphql(GET_MEDICATION_QUERY, {
	options: (ownProps) => {
		const { drug, medication, user } = ownProps;
		const { id: drugId } = drug || {};
		const { id } = medication || {};
		return {
			variables: {
				user_id: user.id,
				id,
				drugId: drugId
			},
			fetchPolicy: 'network-only'
		};
	},
	props: ({ data }) => {
		if (!data.loading) {
			return {
				medication: data.medication,
				loading: data.loading
			};
		} else {
			return { loading: data.loading };
		}
	}
});



const GET_MEDICATION_PLAN_MEDICATIONS_QUERY = gql`
    query GET_MEDICATION_PLAN_MEDICATIONS ($userId: UID!, $date: Date)  {
            patient (id: $userId)  {
                id
                getMedicationPlan {
                    id
                    medications {
                        ...MedicationCardInfo
                        timesPerDay
                        timesPerHour {
                            id
                            time
                            quantity
                        }
                    }
                }
            }
        }
    ${MedicationCardInfo}
`;
const editMutation = gql`
	mutation MedicationUpdate($id: UID!, $date: Date, $userId: UID!, $input: MedicationInput!) {
		medicationUpdate(id: $id, userId: $userId, input: $input) {
			...MedicationCardInfo
			timesPerDay
			timesPerHour {
				id
				time
				quantity
			}
		}
	}
	${MedicationCardInfo}
`;

const withMutationEdit = graphql(editMutation, {
	props: ({ ownProps, mutate }) => ({
		updateMedication: (input) => {
			const { user, date, medication } = ownProps;
			const { id } = medication || {};
			const { id: userId } = user || {};
			console.log(input);
			return mutate({
				variables: { id, date, userId, input: { details: input } },
				/*refetchQueries: [{
                    query: editMutation,
                    variables: {
                        id: id,
                        user_id: uid
                    },
                }],*/
				// refetchQueries: [
				// 	{
				// 		query: GET_MEDICATION_PLAN_QUERY,
				// 		variables: { userId, date }
				// 	}
				// ],
				
			});
		}
	})
});

const addMutation = gql`
	mutation MedicationAdd($userId: UID!, $date: Date, $input: MedicationInput!) {
		medicationAdd(userId: $userId, input: $input) {
			...MedicationCardInfo
			timesPerDay
			timesPerHour {
				id
				time
				quantity
			}
		}
	}
	${MedicationCardInfo}
`;



const withMutationAdd = graphql(addMutation, {
	props: ({ ownProps, mutate }) => ({
		updateMedication:   (input) => {
			const { user, date, medicationPlan } = ownProps;
			const { id: userId } = user || {};
			
			let refetchQueries = [];
			console.log(ownProps);
			if (!medicationPlan) {
				refetchQueries.push({
					query: GET_MEDICATION_PLAN_QUERY,
					variables: { userId: ownProps.user.id, date: ownProps.date }
				});
			}
			return mutate({
				variables: { userId, date, input: { details: input } },
				refetchQueries: refetchQueries,
				update: (store, { data: { medicationAdd } }) => {
					if (medicationPlan) {
                    // Read the data from our cache for this query.
                    const info = store.readQuery({
                        query: GET_MEDICATION_PLAN_MEDICATIONS_QUERY,
                        variables: {
							userId, date
                        }
					});
					const {patient} = info || {};
					const {getMedicationPlan} = patient || {};
					const {medications=[]} = getMedicationPlan || {};

					const newMedications = [...medications, medicationAdd];
					const newMedicationPlan = {...getMedicationPlan, medications: newMedications};
					const newPatient = {...patient, getMedicationPlan:newMedicationPlan };
					// Add our comment from the mutation to the end.
                    // data = medicationUpdate;
					// Write our data back to the cache.
                    store.writeQuery({
                        query: GET_MEDICATION_PLAN_MEDICATIONS_QUERY,
                        data: {patient: newPatient},
                        variables: {
                            userId, date
						}});
					}
                },
			});
			// .then((data) => {
			// 	onCancel(data);
			// 	message.success('Saved');
			// });
		}
	})
});


const SelectMedicationDrawer = compose(
    withProps((props) => {
		return {
			modalTitle: 'Select Medication',
            modalWidth: 600,
            selectInfo:true
		};
	}),
    withDrawer,
    withSpinnerWhileLoading,
    withHandlers({
        onChange: props => drug => {
            console.log(drug);
            props.setDrug(drug);
        }
    })
)(MedicationSelect);

const withAdd = compose(
	branch(props => !props.drug, renderComponent(SelectMedicationDrawer)),
    withMutationAdd, 
);
const withEdit = compose(withQuery, withMutationEdit);

const enhance = compose(
	withLoadingButton,
    withState('drug', 'setDrug', props => {
        const {medication} = props;
        const {drug} = medication || {};
        return drug;
    }),
    branch((props) => props.medication, withEdit, withAdd),
	withProps((props) => {
        const {drug} = props;
		const {name, dosage, form} = drug || {};
		const title = name +' '+form+', '+dosage;
		const modalTitle = props.medication ? 'Edit ' + title : 'Add '+title;
		return {
			modalTitle,
			modalWidth: 600
		};
	}),
	Form.create(),
	withHandlers({
		onSubmit: (props) => (e) => {
			e.preventDefault();
			console.log(props);
			const { form, medication, saveMedication,updateMedication, drug } = props;
			const { timesPerHour=[] } = medication || {};
			form.validateFields((err, values) => {
				console.log(err);
				if (!err) {
					const {
						type,
						startDate,
						endDate,
						purpose,
						timesAtHours,
						directions,
						sideEffects,
						quantity,
						timesPerDay
					} = values;
					let times = [];

					if (type === 'at_times') {
						times = timesAtHours && timesAtHours.map((timeInfo, i) => {
							const id = timesPerHour[i] ? timesPerHour[i]['id'] : '';
							return { id, time: timeInfo.time.format('HH:mm:ss'), quantity: timeInfo.quantity };
						});
					}

					const startDateYMD = startDate.format('YYYY-MM-DD');
					const endDateYMD = endDate ? endDate.format('YYYY-MM-DD') : '';
					const input = {
						drugId: drug.id,
						type: type,
						startDate: startDateYMD,
						endDate: endDateYMD,
						purpose: purpose,
						directions: directions,
						sideEffects: sideEffects,
						quantity: quantity,
						timesPerDay: timesPerDay,
						timesAtHours: times
                    };
					props.setLoadingButton(true);
                    updateMedication(input).then((data) => {
						props.setLoadingButton(false);
						 props.onHide();
					});
				}
			});
		}
	}),
	withDrawer,
	withSpinnerWhileLoading,
	withState('timesAtHours', 'setTimesAtHours', (props) => {
		const { medication } = props;
		const { timesPerHour = [] } = medication || {};
		return timesPerHour.length;
	}),
	withState('showAdvance', 'setShowAdvance', false),
	withHandlers({
		toggleAdvanced: (props) => () => {
			props.setShowAdvance(!props.showAdvance);
		},
		onSelectTimes: (props) => (value) => {
			props.setTimesAtHours(value);
		},
		onTotal: (props) => () => {}
	})
);

//export const MedicationAddForm = withMutationAdd(MedicationEditWithQuery);

export default enhance(MedicationManagerPure);
