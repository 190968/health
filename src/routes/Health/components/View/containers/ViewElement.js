import DiagnosisView from "../components/Diagnosis";
import AllergyView from "../components/Allergy";
import ClinicalTrialView from "../components/ClinicalTrial";
import OncologyView from "../components/Oncology";
import TreatmentView from "../components/Treatment";
import RadiologyView from "../components/Radiology";
import RadiationView from "../components/Radiation";
import PathologyView from "../components/Pathology";
import ChemotherapyView from "../components/Chemotherapy";
import { compose, branch, withProps } from "recompose";
import { conditionalWhenThen } from "../../../../../utils/main";

const Blank = props => null;
const enhance = compose(
    withProps(props => {
        const {healthRecord} = props;
        const {healthType:type, details} = healthRecord || {};
        return {type, element:details};
    }),
    conditionalWhenThen([
        {when: ({type}) => type === 'diagnosis', then: DiagnosisView},
        {when: ({type}) => type === 'allergy', then: AllergyView},
        {when: ({type}) => type === 'med_allergy', then: AllergyView},
        {when: ({type}) => type === 'clinical_trial', then: ClinicalTrialView},
        {when: ({type}) => type === 'radiology', then: RadiologyView},
        {when: ({type}) => type === 'radiation', then: RadiationView},
        {when: ({type}) => type === 'pathology', then: PathologyView},
        {when: ({type}) => type === 'oncology', then: OncologyView},
        {when: ({type}) => type === 'treatment', then: TreatmentView},
        {when: ({type}) => type === 'chemotherapy', then: ChemotherapyView},
    ]),
);
export const HealthViewElement = enhance(Blank);