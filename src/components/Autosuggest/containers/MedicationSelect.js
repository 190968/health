import MedicationSelectPure from '../components/MedicationSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { DrugInfoFragment } from '../../../routes/Plan/components/MedicationPlan/components/Medication/components/fragments';

export const GET_MEDICATIONS_LIST_QUERY = gql`
	query GET_MEDICATIONS_LIST($userId: UID, $search: String) {
		medicationsList(userId: $userId, search: $search) {
			...DrugInfo
		}
	}
	${DrugInfoFragment}
`;

const withQuery = graphql(GET_MEDICATIONS_LIST_QUERY, {
	options: () => {
		return {
			fetchPolicy: 'network-only'
		};
	},
	props: ({ data }) => {
		if (!data.loading) {
			return {
				items: data.medicationsList,
				loading: data.loading,

				doSearch(search) {
					return data.refetch({search});
				}
			};
		} else {
			return { loading: data.loading };
		}
	}
});

export const MedicationSelect = withQuery(MedicationSelectPure);
export default MedicationSelect;
