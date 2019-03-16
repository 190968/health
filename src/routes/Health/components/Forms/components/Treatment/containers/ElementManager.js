import ElementManager from '../components/ElementManager';
import { compose, withProps,withState, withHandlers, branch, renderComponent } from 'recompose';
import { withDrawer } from '../../../../../../../components/Modal';
import ChemotherapyElementEditor  from '../components/ElementManager/containers/ChemotherapyElementEditor';
import ClinicalTrialEditor  from '../components/ElementManager/containers/ClinicalTrialEditor';
import OncologyEditor  from '../components/ElementManager/containers/OncologyEditor';
import RadiologyEditor  from '../components/ElementManager/containers/RadiologyEditor';
import RadiationEditor  from '../components/ElementManager/containers/RadiationEditor';
import PathalogyEditor  from '../components/ElementManager/containers/PathalogyEditor';


const withExistingElement = withProps(props => {
    const {treatmentElement} = props;
    const {type, element} = treatmentElement || {};
    return {type, element};
});
const enhance = compose(
    branch(props => props.treatmentElement, withExistingElement),
    withState('type', 'setType', props => props.type),
    withHandlers({
        onSubmit: props => (element) => {
            const {treatmentElement,type} = props;
            const attachment = {type, element};
            // console.log(attachment);
             console.log(props);
             console.log(attachment);
            if (treatmentElement) {
                // if treatmentElement exists, elementthen just save update
                props.updateElement({...treatmentElement, element});
                props.onHide();
            } else {
                // if new - udpdate
                props.appendElements(attachment);
                props.onHide();
            }
        }
    }),
    branch(props => props.type === 'chemotherapy', renderComponent(ChemotherapyElementEditor)),
    branch(props => props.type === 'clinical_trial', renderComponent(ClinicalTrialEditor)),
    branch(props => props.type === 'oncology', renderComponent(OncologyEditor)),
    branch(props => props.type === 'radiology', renderComponent(RadiologyEditor)),
    branch(props => props.type === 'radiation', renderComponent(RadiationEditor)),
    branch(props => props.type === 'pathology', renderComponent(PathalogyEditor)),
    //branch(props => !props.type, renderComponent(SelectType)),
    // branch(props => props.type && props.type === 'ap', renderComponent(TaskManagerAttachmentSelectAp)),
    // branch(props => props.type && props.type === 'assessment', renderComponent(TaskManagerAttachmentSelectAssessment)),
    // branch(props => props.type && props.type === 'chklist', renderComponent(TaskManagerAttachmentSelectChecklist)),
    //branch(props => props.type == 'assessment', renderComponent(SelectAssessment)),
    withProps(props => {
        const {type} = props;
        return {modalTitle: 'Select Type'}
    }),
    withDrawer,
);
export const TreatmentFormElementManager = enhance(ElementManager);


export const prepareTreatmentElementObjectInput = record => {
    const {type, element} = record;
    let objectToClean = null;
    if (element) {
        // for treatment health records
        objectToClean = element;
    } else {
        // for health records
        objectToClean = record[type] || {};
    }
    

    //console.log(element, 'before');
    let {id, __typename, ...object} = objectToClean;

    switch(type) {
        case 'chemotherapy':
            let {chemotherapy, ...otherChemotherapyFields} = object;
            const {id:chemotherapyId} = chemotherapy || {};
            object =  {...otherChemotherapyFields, chemotherapyId};
            break;
        case 'radiology':
            let {procedure, ...otherRadiologyFields} = object;
            const {id:procedureId} = procedure || {};
            object =  {...otherRadiologyFields, procedureId};
            break;
        case 'clinical_trial':
            let {trial, ...otherClinicalTrialFields} = object;
            const {id:trialId} = trial || {};
            object =  {...otherClinicalTrialFields, trialId};
            break;
        case 'oncology':
            let {diagnosis, ...otherOncologyFields} = object;
            const {id:diagnosisId} = diagnosis || {};
            object =  {...otherOncologyFields, diagnosisId};
            break;
        case 'treatment':

            let { elements, ...otherTreatmentFields } = object;
            console.log(elements);
            object = {
                ...otherTreatmentFields, elements: elements.map(element => {
                    return prepareTreatmentElementInput(element);
                })
            }
        break;
    }
    return object;
}

export const prepareTreatmentElementInput = record => {
    console.log(record,'elementInit');
    const {id, type,element} = record;
    const object = prepareTreatmentElementObjectInput({type, element});
    console.log(object);
    return {id, type, [type]: object};
}

export const prepareExistingHealthElementForMutation = treatmentElement => {
    // //console.log(element);
    return treatmentElement;
     const {element, ...otherProps} = treatmentElement;
     const {type} = otherProps;
     return {...otherProps, [type]: element};
}

