import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { Icon } from 'antd';
import { defaultHealthRecordDetails } from '../../utils';

export const ClinicalTrialView = props => {
    const {healthRecord, element} = props;
    const {trial,
    cohort,
    sponsor} = element || {};
    const {id,nctId,title} = trial || {};
    let dtls = [
        ['Trial ID', nctId],
        ['Trial Title', title],
        ['Cohort', cohort],
        ['Sponsor', sponsor],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <DescriptionList details={dtls} />
}

export default ClinicalTrialView;