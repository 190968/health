import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import { defaultHealthRecordDetails } from '../../utils';

export const ChemotherapyView = props => {
    const {healthRecord, element} = props;
    const {
        chemotherapy,
        cycles,
        days,
        timesPerDay} = element || {};
    const {title} = chemotherapy || {};
    let dtls = [
        ['Chemotherapy', title],
        ['Cycles', cycles],
        ['Days', days],
        ['Times Per Day', timesPerDay],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} col={1} />
}

export default ChemotherapyView;