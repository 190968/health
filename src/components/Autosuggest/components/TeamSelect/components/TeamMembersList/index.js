import React from 'react'

import {Checkbox, Card} from 'antd';
const CheckboxGroup = Checkbox.Group;


const vertStyle = {
    display: 'block',
    /*height: '30px',*/
    //lineHeight: '30px',
    marginLeft: 0,
};
const TeamMembersList = props =>  {
    
    const {items=[], simple=false, users=[]} = props;


    let radioStyle = {};
    if (!simple) {
        radioStyle = vertStyle;
    }
    let plainOptions = items.map((item) => {
        const {user} = item;
        return <Checkbox key={user.id} value={user.id} style={radioStyle} >{user.fullName}</Checkbox>;
    });


    return <CheckboxGroup value={users}  onChange={props.onChange} /*value={value} onChange={this.onChange} disabled={disabled} */>{plainOptions}</CheckboxGroup>
}

export default TeamMembersList;
