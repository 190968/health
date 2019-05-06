import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import OptionsElementBuilder from '../components/OptionsElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";
import {injectIntl} from 'react-intl';
 
export default (OptionsElementBuilder);



export const preparePlanElementOptionsInput = (values) => {
    const { title, options=[]} = values;
    return {
        title,
        options
    }
}