import { TreatmentPureForm, prepareTreatmentInput } from "../../../../../../Health/components/Forms/containers/Treatment";
import { compose, withProps, withHandlers } from "recompose";
import { withDrawer } from "../../../../../../../components/Modal";



const prepareInput = value => {
    console.log(value);
    let value2 = prepareTreatmentInput(value);
    console.log(value2);
    return {treatmentElement:value2};
}
const enhance = compose(
    withProps(props => {
        const {element} = props;
        const {itemInfo} = element || {};
        return {element: itemInfo, hideHealthData:true};
    }),
    withHandlers({
        onSubmit: props => callback => {
            if (1===1 || !props.id || props.form.isFieldsTouched()) {
                props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
            } else {
                props.onHide();
            }
        },
    }),
    withDrawer
);
export default enhance(TreatmentPureForm);
// import React from 'react';
// import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
// import TreatmentElementBuilderPure, {prepareInput} from '../components/TreatmentElementBuilder';
// import {Form} from 'antd';
// import {modalHOC, withSpinnerWhileLoading} from "../modal";


// const enhancePure = compose(
//     withState('elements', 'setElements', props => {
//         const {element} = props;
//         //const {itemInfo:details={}} = element;
//         const {elements = []} = element || {};
//         return elements;
//     }),
// );
 export const TreatmentElementBuilder = TreatmentPureForm;





















export const enhanceTreatmentElement = compose(
    // // withSpinnerWhileLoading,
    // // current step
    // //withState('step', 'setStep', 0),
    // enhancePure,

    // // element details???
    // withState('element', 'setElement', props => {
    //     //console.log(props);
    //     const {element={}} = props;
    //     return element;
    // }),

    // withProps(props => {
    //         //console.log(props);
    //         const {element={},  details={}} = props;
    //         const {itemInfo=details} = element;

    //         const {elements: els=[]} = details;
    //         const {elements} = props;
    //         const elementsToUse = elements.length > 0 ? elements : els;
    //         return {details:itemInfo, elements:elementsToUse};
    //     }
    // ),

    // withHandlers({
    //     prepareInput: props => values => {
    //         return prepareInput(values);
    //     },
    // }),
    withHandlers({
        saveElement: props => callback => {
            const callbackSave = (element) => {
                // save the new info
                props.setElement(element);
                callback();
            }
            props.handleSave({prepareInput:prepareInput, callback:callbackSave} );
        }
    }),
    withHandlers({
        onSubmit: props => event => {
            props.saveElement(props.onHide);
        },
    }),
)

// const enhanceWithModal = compose(
//     enhanceTreatmentElement,
//     withHandlers({
//         modalTitle: props => values => {
//             return props.id ? 'Edit Treatment' : 'Add Treatment';
//         },
//     }),
//     modalHOC,
// )
// export default enhanceWithModal(TreatmentElementBuilderPure);