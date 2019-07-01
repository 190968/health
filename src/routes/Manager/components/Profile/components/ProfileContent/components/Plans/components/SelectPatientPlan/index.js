import React from 'react';
import { SelectFromList } from '../../../../../../../../../../components/UI/SelectFromList';


const items = [
    {'id': 'ap', label: 'ActionPlan'},
    {'id': 'medication', label: 'Medication Plan'},
    {'id': 'biometric', label: 'Biometric Plan'},
    {'id': 'discharge_plan', label: 'Discharge Plan'},
    {'id': 'dme', label: 'DME Referral'},
    {'id': 'feeding', label: 'Feeding Plan', disabled:true},
    {'id': 'pt', label: 'Physical Therapy Plan', disabled:true},
    {'id': 'adl', label: 'ADL Plan', disabled:true},
];

const SelectPatientPlan = props => {

    return  <SelectFromList cols={1} items={items} onSelect={props.onSelect} />
}

export default SelectPatientPlan;