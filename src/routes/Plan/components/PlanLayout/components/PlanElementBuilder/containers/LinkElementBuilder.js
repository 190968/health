import React from 'react';
import {compose, withHandlers} from 'recompose';
import LinkElementBuilderPure from '../components/LinkElementBuilder';
import {modalHOC} from "../modal";


export const LinkElementBuilder = LinkElementBuilderPure;
 
export default (LinkElementBuilderPure);


export const preparePlanElementLinkInput = (values) => {
    const {label, url, description} = values;

    return {
            label,
            url,
            description,
    }
}