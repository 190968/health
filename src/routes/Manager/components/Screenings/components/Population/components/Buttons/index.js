import React from 'react';
import {Button} from 'antd';
import CohortManagerButton from '../../../../../Cohorts/components/Buttons/components/Manage';
import {SendMessageButton} from '../../../../../../../../components/User/containers/SendMessageButton';


const ScreeningPopulationButtons = props => {
    const {population=[]} = props;
    const patients = population.map(p => p.user);
    const patientsCount = patients.length;
    return <React.Fragment>
    <Button onClick={props.sendReminder} disabled patients={patients}>Send Reminder ({patientsCount})</Button> <SendMessageButton selectedPeople={patients} label={'Message ('+patientsCount+')'} /> <CohortManagerButton titleButton={'Send Cohort ('+patientsCount+')'} button patients={patients} />
</React.Fragment>;
}

export default ScreeningPopulationButtons; 