import { TreatmentPureForm } from "../../../../../../Health/components/Forms/containers/Treatment";
import { compose, withProps, withHandlers } from "recompose";
 
const enhance = compose(
    withProps(props => {
        const {element} = props;
        const {itemInfo} = element || {};
        return {element: itemInfo, hideHealthData:true};
    }),
    // withHandlers({
    //     onSubmit: props => callback => {
    //         if (1===1 || !props.id || props.form.isFieldsTouched()) {
    //             props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
    //         } else {
    //             props.onHide();
    //         }
    //     },
    // }),
    // withDrawer
);
export default enhance(TreatmentPureForm);
 
 export const TreatmentElementBuilder = TreatmentPureForm;

 export const prepareInput = props => props;





















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
            props.onSubmit({callback:callbackSave} );
        }
    }),
    withHandlers({
        onSubmit: props => callback => {
            // console.log(props);
            // const callbackSave = (element) => {
            //     // save the new info
            //     props.setElement(element);
            //     callback();
            // }
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