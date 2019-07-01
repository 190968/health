import React from 'react';
import { List, Avatar } from 'antd';
import moment from 'moment';
import { getMedicationPrescription } from '../../../../../../../../routes/Plan/components/MedicationPlan/components/MedicationCard';

const AttachmentItemMedication = props => {
    const {attachment} = props;
    console.log(props, 'Medication Props');
    const {object} = attachment || {};
    const {drug} = object || {};
    const {name} = drug || {};
    
    // const {startDate, endDate} = schedule || {};

    return <List.Item.Meta
     avatar={<Avatar icon={'medicine-box'} />}
    title={name}
    description={getMedicationPrescription({medication:object})}
  />
}

export default AttachmentItemMedication;