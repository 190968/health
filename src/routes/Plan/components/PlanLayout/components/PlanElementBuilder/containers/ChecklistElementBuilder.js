import React from 'react';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import ChecklistElementBuilderPure  from '../components/ChecklistElementBuilder';
import {modalHOC, withSpinnerWhileLoading} from "../modal";

export const ChecklistElementBuilder = ChecklistElementBuilderPure;

export default (ChecklistElementBuilderPure);



export const preparePlanElementChecklistInput = (values) => {
    const {title, keys=[], ids=[]} = values;
    let {options=[]} = values;
    // console.log(values);
    options = options.map(option => {
        const {label, id} = option;
        return {id, label}
    });
    return {
        title,
        options
    };
}