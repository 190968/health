import React from 'react';
// import { Input } from 'antd';
import { TimeField } from '../../../../../../../../../../components/FormCustomFields';
import { getMomentFromUTCTime } from '../../../../../../../../../../utils/datetime';
import InputField from '../../../../../../../../../../components/FormCustomFields/components/InputField';

const AssessmentInput = props => {
    const {onChange, reports, disabled=false, isTime=false, isNumber} = props;
    console.log(props, 'props');
    let value = reports.map(report => report.value);
    value = value[0] || null;

    if (isTime) {

        if (value !== '') {
            value = value && getMomentFromUTCTime(value);
        } else {
            value = null;
        }
        return <TimeField onChange={onChange} disabled={disabled} value={value} />
    }
    return <InputField onChange={onChange} isNumber={isNumber} asTextArea disabled={disabled} value={value} />
}

export default AssessmentInput;