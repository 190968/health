import React from 'react';
import {compose, withHandlers} from 'recompose';
import TrackerElementBuilderPure from '../components/TrackerElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";


export const TrackerElementBuilder = TrackerElementBuilderPure;

// export const enhance = compose(
//     // withSpinnerWhileLoading,
//     withHandlers({
//         onSubmit: props => callback => {
//             if (!props.id || props.form.isFieldsTouched()) {
//                 props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
//             } else {
//                 props.onHide();
//             }
//         },
//     }),
// );

// const enhanceWithModal = compose(
//     enhance,
//     withHandlers({
//         modalTitle: props => values => {
//             return props.id ? 'Edit Tracker' : 'Add Tracker';
//         },
//     }),
//     modalHOC,
// );

export default (TrackerElementBuilderPure);


export const preparePlanElementTrackerInput = (values) => {
     const {
        parentId
    } = values;
    const {id} = parentId || {};
    console.log(values);
    return {...values, 
        parentId:id

    }
}