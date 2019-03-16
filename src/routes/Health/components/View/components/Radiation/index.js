import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { Icon } from 'antd';
import { defaultHealthRecordDetails } from '../../utils';

export const RadiationView = props => {
    const {healthRecord, element} = props;
    const {
        treatmentAnatomicSite,
        treatmentTechnique,
        regionalModality,
        regionalDose,
        regionalFractions
    } = element || {};

    const {value, units} = regionalDose || {};
    let dtls = [
        ['Anatomic Site', treatmentAnatomicSite],
        ['Technique', treatmentTechnique],
        ['Modality', regionalModality],
        ['Regional Dose', value+' '+units],
        ['Regiona Fractions', regionalFractions],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} col={1}  />
}

export default RadiationView;