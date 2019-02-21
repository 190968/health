import React from 'react'

import {Checkbox, Card} from 'antd';
import Loading from '../../../../../Loading';
const CheckboxGroup = Checkbox.Group;


const vertStyle = {
    display: 'block',
    /*height: '30px',*/
    //lineHeight: '30px',
    marginLeft: 0,
};
const TeamMembersList = props =>  {
    
    const {items=[], loading, simple=false, users=[]} = props;

    if (loading) {
        return <Loading />;
    }
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
