import HealthManagerPure from '../components/HealthManager';
import {compose, withProps, withState} from 'recompose';
import { conditionalWhenThen } from '../../../utils/main';

import { AllergyForm } from '../components/Forms/containers/Allergy';
import {ClinicalTrialForm} from '../components/Forms/containers/ClinicalTrial';
import {DiagnosisForm} from '../components/Forms/containers/Diagnosis';
import { RadiologyForm } from '../components/Forms/containers/Radiology';
import { RadiationForm } from '../components/Forms/containers/Radiation';
import { PathologyForm } from '../components/Forms/containers/Pathology';
import { OncologyForm } from '../components/Forms/containers/Oncology';
import { TreatmentForm } from '../components/Forms/containers/Treatment';
import { ChemotherapyForm } from '../components/Forms/containers/Chemotherapy';
import { MedicationForm } from '../components/Forms/containers/Medication';
import { withDrawer } from '../../../components/Modal';


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

const enhance = compose(
    withProps(props => {
        const {healthRecord, treatmentElement, type} = props;
        if (treatmentElement) {
            return treatmentElement;
        }
        //let {type} = props;
        const {healthType=type, details} = healthRecord || {};
        //const {}
        return {type:healthType, element:details, formItemLayout};
    }),
     
    withState('type', 'setType', props => props.type),
    conditionalWhenThen([
        {when: ({type}) => type === 'diagnosis', then: DiagnosisForm},
        {when: ({type}) => type === 'allergy', then: AllergyForm},
        {when: ({type}) => type === 'med_allergy', then: AllergyForm},
        {when: ({type}) => type === 'clinical_trial', then: ClinicalTrialForm},
        {when: ({type}) => type === 'radiology', then: RadiologyForm},
        {when: ({type}) => type === 'radiation', then: RadiationForm},
        {when: ({type}) => type === 'pathology', then: PathologyForm},
        {when: ({type}) => type === 'oncology', then: OncologyForm},
        {when: ({type}) => type === 'treatment', then: TreatmentForm},
        {when: ({type}) => type === 'chemotherapy', then: ChemotherapyForm},
        {when: ({type}) => type === 'medication', then: MedicationForm},
    ]),
    withProps(props => {
        return {modalTitle: 'Select Type'}
    }),
    withDrawer

   
);
export const HealthManager = enhance(HealthManagerPure);