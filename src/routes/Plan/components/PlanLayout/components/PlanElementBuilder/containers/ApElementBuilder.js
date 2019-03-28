import React from 'react';
import ApElementBuilderPure  from '../components/ApElementBuilder';

export const ApElementBuilder = ApElementBuilderPure;

// const enhance = compose(
//     // withSpinnerWhileLoading,
//     // injectIntl,
//     // withState('element', 'setElement', props => {
//     //     //console.log(props);
//     //     const {element={}} = props;
//     //     return element;
//     // }),
//     withProps(props => {
//         const {element, details={}} = props;
//         const {itemInfo=details} = element || {};
//         return {details:itemInfo};
//         }
//     )
// )
export default (ApElementBuilderPure);


export const preparePlanElementApInput = (values) => {
    const {plan} = values;
    // console.log(values);
    return plan.id
}