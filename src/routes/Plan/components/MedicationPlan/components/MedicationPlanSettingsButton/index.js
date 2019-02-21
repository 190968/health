import React from 'react';
import TaskAssignButton from '../../../../../../components/Tasks/components/TaskAssignButton';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import PlanTeamManagerButton from '../../../Team/components/Buttons/manager';
import MedicationManagerButton from '../Medication/components/MedicationManager/components/MedicationManagerButton';


const MedicationPlanSettingsButton = props => {
    const {medicationPlan, user, date, currentUser} = props;
    const {isProfessional=false} = currentUser || {};
    const {getUserPlan:userPlan, canEdit=false} = medicationPlan || {};
    const defaultProps = {userPlan, user, date};

    let menuItems = [];
    if (isProfessional) {
        menuItems.push({key: 'addNew', content: <MedicationManagerButton user={user} date={date} asMenuItem />, icon: 'user'});
        menuItems.push({key: 'assign', content: <TaskAssignButton  patient={user}  attachments={[{type: 'up', object:userPlan}]} mode={'simple'}  asText={true} />, icon: 'user'});
        menuItems.push({key: 'team', content: <PlanTeamManagerButton userPlan={{...userPlan, user}} asIcon={false} asMenuItem />, icon: 'user'});
    }
     
    
    return <SettingsDropdown items={menuItems} />
}

export default MedicationPlanSettingsButton;