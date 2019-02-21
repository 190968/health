import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import TaskAssignButton from '../../../../../../components/Tasks/components/TaskAssignButton';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import PlanTeamManagerButton from '../../../Team/components/Buttons/manager';
import TrackerManagerButton from '../TrackerManager/components/TrackerManagerButton';


const TrackerPlanSettingsButton = props => {
    const { user, date, currentUser, trackerPlan, canAdd=false} = props;
    const {isProfessional=false} = currentUser || {};
    const {getUserPlan:userPlan} = trackerPlan || {};
    const defaultProps = {userPlan, user, date};


    let menuItems = [];
    if (isProfessional) {
        if (canAdd) {
            menuItems.push({key: 'addNew', content: <TrackerManagerButton user={user} date={date} asMenuItem />, icon: 'user'});
        }
        menuItems.push({key: 'assign', content: <TaskAssignButton  patient={user}  attachments={[{type: 'up', object:userPlan}]} mode={'simple'}  asText={true} />, icon: 'user'});
        menuItems.push({key: 'team', content: <PlanTeamManagerButton userPlan={{...userPlan, user}} asIcon={false} asMenuItem />, icon: 'user'});
    }
    
    return <SettingsDropdown items={menuItems} />
}

export default TrackerPlanSettingsButton;