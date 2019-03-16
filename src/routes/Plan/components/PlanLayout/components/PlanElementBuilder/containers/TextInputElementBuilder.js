import React from 'react';
import {compose, withHandlers} from 'recompose';
import TextInputElementBuilderPure from '../components/TextInputElementBuilder';
import {modalHOC} from "../modal";


export const TextInputElementBuilder = TextInputElementBuilderPure;
 

export default (TextInputElementBuilderPure);

export const preparePlanElementTextInputInput = (values) => {
    const {title, isBlog} = values;

    return {
        title,
        isBlog,
    }
}