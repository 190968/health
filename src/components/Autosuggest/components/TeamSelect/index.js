import React from 'react';
import TeamMembersCheckboxes from './containers/TeamMembersList';
import { Row, Col, Radio, Input, Checkbox } from 'antd';

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
    console.log(props);
    return <React.Fragment>
        <RadioGroup onChange={handleMode} value={mode}>
            <Radio style={radioStyle} value={1}>Entire Team</Radio>
            <Radio style={radioStyle} value={2}>Select Team Members</Radio>
      </RadioGroup>
   {mode === 2 && <TeamMembersCheckboxes onChange={handleUsers} user={user} users={users} />}
   </React.Fragment>
}

export default TeamSelect;