import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { Icon } from 'antd';
import { defaultHealthRecordDetails } from '../../utils';


export const DiagnosisView = props => {
    const {healthRecord, element} = props;
    const {details, isPrimary, isActive, riskLevel, date, notes } = healthRecord || {};
    const {code} = element || {};
    const {name, code:icdCode} = code || {};
    let dtls = [
        ['Diagnosis', icdCode+' '+name],
        ['Risk Level', riskLevel],
        ['Current', isActive ? <Icon type={'check-circle'} /> : null],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} col={1}  />
}

export default DiagnosisView;