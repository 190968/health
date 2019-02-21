import MedicationFullDetailsPure from '../components/MedicationsFullDetails'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {MedicationSummary, MedicationInfo} from '../components/fragments';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../../../components/Modal';
import {compose, withProps} from 'recompose';

const MED_DETAILS = gql`
query GET_MEDICATION_DETAILS($id:UID!, $userId: UID!, $date: Date) {
            medication(id: $id,userId: $userId) {
                ...MedicationInfo
                ...MedicationSummary
                timesPerHour {
                  id
                  time
                  quantity
                  __typename
                }
                prescription
                period
                prescriber {
                    id
                    fullName
                }
                reactions {
                    id
                    reaction
                    severity
                    createdAt
                }
            }
}
${MedicationSummary}
${MedicationInfo}
`;

const withQuery = graphql(MED_DETAILS,
    {
        options: (ownProps) => {
            return   {
                variables: {
                    userId: ownProps.user.id,
                    date: ownProps.date,
                    id: ownProps.medication.id,
                },
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    info: data.medication,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    withQuery,
    withProps(props => {
        const {medication} = props;
        const {drug} = medication || {};
        return {
            modalTitle: drug.name,
            modalWidth:600
        }
    }),
    withDrawer,
    withSpinnerWhileLoading
    
)
export const MedicationFullDetails = enhance(MedicationFullDetailsPure);
export default MedicationFullDetails;
