import React from 'react';
import TeamMembersCheckboxes from './containers/TeamMembersList';
import { Row, Col, Radio, Input, Checkbox } from 'antd';
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

const TeamSelect = props => {
    const {user, handleUsers, handleMode, mode, users=[]} = props;
    //const {getFieldValue} = form;
    //const alertMode = getFieldValue('alertMode');
    return <React.Fragment>
        <RadioGroup onChange={handleMode} value={mode}>
            <Radio style={radioStyle} value={1}><FormattedMessage {...messages.entire} /></Radio>
            <Radio style={radioStyle} value={2}><FormattedMessage {...messages.selected} /></Radio>
      </RadioGroup>
   {mode === 2 && <div><TeamMembersCheckboxes onChange={handleUsers} user={user} users={users} /></div>}
   </React.Fragment>
}

export default TeamSelect;