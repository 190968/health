import React from 'react';
import {Button, Popover, Tooltip} from 'antd';
import { FollowUpSnoozeForm } from './containers/Form';

const Snooze = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    const content=<FollowUpSnoozeForm {...otherProps} onHide={toggleModal} />;

    return <Popover content={content} title={'Snooze For'} placement={'bottom'} trigger="click"
        visible={showModal}
        onVisibleChange={toggleModal}
      
      >
        <Tooltip title={'Snooze'}><Button size={'small'} icon="clock-circle" /></Tooltip>
        </Popover>;
}

export default Snooze;