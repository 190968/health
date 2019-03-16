import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import { defaultHealthRecordDetails } from '../../utils';

export const PathologyView = props => {
    const {healthRecord, element} = props;
    const {
        tumorHistology,
        tumorBehavior,
        tumorGrade,
        tumorSize
    } = element || {};

    const {value, units} = tumorSize || {};
    let dtls = [
        ['Histology', tumorHistology],
        ['Behavior', tumorBehavior],
        ['Tumor Grade', tumorGrade],
        ['Tumor Size', value+' '+units],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} col={1}  />
}

export default PathologyView;