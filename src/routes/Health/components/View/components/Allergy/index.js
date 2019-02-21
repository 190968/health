import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { Icon } from 'antd';
import { defaultHealthRecordDetails } from '../../utils';

export const AllergyView = props => {
    const { healthRecord, element } = props;
    const { title,
        treatment,
        reaction,
        severity } = element || {};
    let dtls = [
        ['Allergy', title],
        ['Treatment', treatment],
        ['Reaction', reaction],
        ['Severity', severity],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} />
}

export default AllergyView;