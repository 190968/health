import React from 'react';
import { Menu, Dropdown, Icon, Tooltip } from 'antd';
import TrackerManagerButton from '../../../TrackerManager/components/TrackerManagerButton';
import TrackerDeleteButton from './containers/TrackerDeleteButton';
import { withHandlers } from 'recompose';
import { TrackerRemindersButton } from '../../../../containers/TrackerRemindersButton';
import PlanTeamManagerButton from '../../../../../Team/components/Buttons/manager';

const TrackerSettingsButton = props => {
    const {biometricPlan, tracker, user, date, placement} = props;
    const {canEdit=false, canReport=false, getUserPlan} = biometricPlan || {};
    const defaultProps = {tracker, user, date};
    const menu = (
        <Menu>
          {canEdit && <Menu.Item key="edit">
            <TrackerManagerButton {...defaultProps} asIcon={false} asMenuItem />
          </Menu.Item>}
          {canReport && <Menu.Item key="reminders">
            <TrackerRemindersButton {...defaultProps} asIcon={false} asMenuItem />
          </Menu.Item>}
          <Menu.Item key="team">
            <PlanTeamManagerButton userPlan={{...getUserPlan, user}} asIcon={false} asMenuItem />
          </Menu.Item>
          <Menu.Divider />
          {canEdit && <Menu.Item key="delete"><TrackerDeleteButton {...defaultProps} /> </Menu.Item>}
        </Menu>
      );

    return <Tooltip title={'Settings'}><Dropdown  onClick={(e) => e.stopPropagation()}  overlay={menu} trigger={['click']} placement={placement} >
    <Icon type="setting" theme="outlined" />
    </Dropdown></Tooltip>
}

export default withHandlers({
    onClick: props => (e) => {
        e.stopPropagation();
    }
})(TrackerSettingsButton);