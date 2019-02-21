import Element from '../components/Element';
import {compose, withProps,} from 'recompose';
import { conditionalWhenThen } from '../../../../../../../../../utils/main';
import DiagnosisView from '../../../../../../View/components/Diagnosis';
import AllergyView from '../../../../../../View/components/Allergy';
import ClinicalTrialView from '../../../../../../View/components/ClinicalTrial';
import RadiologyView from '../../../../../../View/components/Radiology';
import RadiationView from '../../../../../../View/components/Radiation';
import PathologyView from '../../../../../../View/components/Pathology';
import OncologyView from '../../../../../../View/components/Oncology';
import TreatmentView from '../../../../../../View/components/Treatment';
import ChemotherapyView from '../../../../../../View/components/Chemotherapy';

const enhance = compose(
    withProps(props => {
        //console.log(props);
        const {element} = props;
        const {id, type} = element || {};
        let object = null;
        if (id) {
            object = element.element || {};
        } else {
            object = element.element;//[type] || {};
        }
        
        return {type, element:object};
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

export const TreatmentFormElement = enhance(Element);