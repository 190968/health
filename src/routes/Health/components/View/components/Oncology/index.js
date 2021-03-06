import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import { defaultHealthRecordDetails } from '../../utils';
import {formatOncologyType, formatOncologyDisorder, formatOncologyBehavior} from './utils';
export const OncologyView = props => {
    const {healthRecord, element} = props;
    const {
        diagnosis,
        type,
        disorder,
        behavior,
        organSystem,
        anatomicSite} = element || {};
    const {code, name} = diagnosis || {};
    let dtls = [
        ['Diagnosis', code+' '+name],
        ['Diagnosis Type', formatOncologyType(type)],
        ['Disorder', formatOncologyDisorder(disorder)],
        ['Behavior', formatOncologyBehavior(behavior)],
        ['Organ System', organSystem],
        ['Anatomic Site', anatomicSite],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} col={1}  />
}

export default OncologyView;