import React from 'react';
import {Popconfirm, Icon} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../../i18n/en';

const ReminderDeleteButton = props => {
    return <Popconfirm title={<FormattedMessage {...messages.removeConfirm} />} onConfirm={props.handleDelete} okText="Yes" cancelText="No">
        <Icon type="close-circle" theme="outlined" />
  </Popconfirm>
}

export default ReminderDeleteButton;