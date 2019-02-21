import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import { defaultHealthRecordDetails } from '../../utils';

export const RadiologyView = props => {
    const {healthRecord, element} = props;
    const {
        procedure,
        tumorSize,
        regionalLymphNodes,
        metastaticSites,
    } = element || {};

    const {value, units} = tumorSize || {};
    const { 
        hcpc,
        name
    } = procedure || {}
    let dtls = [
        ['Procedure Code', hcpc],
        ['Procedure Name', name],
        ['Tumor size', value+' '+units],
        ['Regional Lymph Nodes', regionalLymphNodes],
        ['metastatic Site', metastaticSites],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} />
}

export default RadiologyView;