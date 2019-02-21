import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import {  Divider } from 'antd';
import { defaultHealthRecordDetails } from '../../utils';
import TreatmentViewElements from './components/Elements';

export const TreatmentView = props => {
    const {healthRecord, element} = props;
    const {
        title,
        elements} = element || {};
    let dtls = [
        ['Title', title],
        ...defaultHealthRecordDetails(healthRecord)
    ]
    return <React.Fragment>
        <DescriptionList details={dtls}  />
        <Divider>Treatment</Divider>
        <TreatmentViewElements elements={elements} />
    </React.Fragment>
}

export default TreatmentView;