import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import OptionsElementBuilder from '../components/OptionsElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';


// const enhance = compose(
//     withSpinnerWhileLoading,
//     injectIntl,
//     withState('element', 'setElement', props => {
//         //console.log(props);
//         const {element={}} = props;
//         return element;
//     }),
//     withProps(props => {
//         const {element, details={}} = props;
//         const {itemInfo=details} = element || {};
//         return {details:itemInfo};
//         }
//     )
// )
export default (OptionsElementBuilder);



export const preparePlanElementOptionsInput = (values) => {
    const { title, isDropdown, isMultiple, isVertical, hasLines} = values;
    let {options=[]} = values;
    // console.log(values);
    options = options.map(option => {
        const {label, id} = option;
        return {id, label}
    });

    return {
            title,
            isDropdown,
            isMultiple,
            hasLines,
            isVertical,
            options
    }
}