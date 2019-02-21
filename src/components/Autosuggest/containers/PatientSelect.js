import PatientSelectPURE from '../components/PatientSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PatientInfoFragment} from "../../../routes/User/fragments";
import {compose, branch, withProps, withState, withHandlers, renderComponent} from 'recompose';
import { withDrawer } from '../../Modal';
import { pathToFileURL } from 'url';

const PATIENTS_LIST_QUERY = gql`
    query GET_PATIENTS_LIST ($search: String) {
        management {
            getPatients (search:$search) {
                edges {
                    ...PatientInfo
                    memberId
                }
                totalCount
            }
        }
    }
    ${PatientInfoFragment}
`;

export const withPatientsSearchQuery = graphql(PATIENTS_LIST_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            const {getPatients} = data.management || {};
            const {edges=[]} = getPatients || {};
            return {
                items: edges,
                loading: data.loading,

                doSearch(search) {
                    return data.refetch({search: search});
                }
            }
        },

    }
);



export const PatientSelect = withPatientsSearchQuery(PatientSelectPURE);
export default PatientSelect;




const withDrawerEnhancement = compose(
    withProps(props => {
        return {modalTitle: 'Select Patient'};
    }),
    withDrawer,
    renderComponent(PatientSelect)
);

const withSelectPatient = compose(

    withState('patient', 'setPatient'),
    withHandlers({
        onChange: props => (patient) => {

            props.setPatient(patient);
            //props.onChange(patient);
        }
    }),
    branch(props =>!props.patient, withDrawerEnhancement),
);

export const withPatientSelectIfNeededModal = branch(props => !props.patient, withSelectPatient);

// export const PatientSelectModal = 