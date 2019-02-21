import React from 'react';
import { Menu, Dropdown, Icon, Divider } from 'antd';
import MedicationManagerButton from '../MedicationManager/components/MedicationManagerButton';
import MedicationDeleteButton from './containers/MedicationDeleteButton';
import MedicationInfoButton from './components/MedicationInfoButton';
import MedicationRemindersButton from '../MedicationReminders/components/MedicationRemindersButton';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';


const MedicationSettingsButton = props => {
    const {medication, user, date, onHide, medicationPlan} = props;
    const defaultProps = {medication, user, date};
    const {canEdit=false} = medicationPlan;
    let items = [];
    if (canEdit) {
      items.push({key: 'edit', content: <MedicationManagerButton {...defaultProps} asIcon={false} asMenuItem /> });
    }
    items.push({key: 'reminders', content: <MedicationRemindersButton {...defaultProps} simple /> });
    items.push({key: 'info', content: <MedicationInfoButton {...defaultProps} /> });
    if (canEdit) {
      items.push(<Divider />);
      items.push({key: 'delete', content: <MedicationDeleteButton {...defaultProps} onFinish={onHide} /> });
    }
     
    return <SettingsDropdown items={items} />

    //   <SettingsDropdown />
    // return <Dropdown overlay={menu} onClick={(e) => e.stopPropagation()} trigger={['click']}>
    // <Icon type="setting" theme="outlined" />
    // </Dropdown>
}

export default MedicationSettingsButton;