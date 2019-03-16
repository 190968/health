import React from 'react';
import ApElementBuilderPure  from '../components/ApElementBuilder';

export const ApElementBuilder = ApElementBuilderPure;

export default (ApElementBuilderPure);


export const preparePlanElementApInput = (values) => {
    const {plan} = values;
    // console.log(values);
    return plan.id
}