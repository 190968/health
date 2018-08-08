import React from 'react'
import Avatar from '../../../../routes/User/components/Avatar';


export const UserWidget = props => {
   
    const {user, onlyFirst=false} = props;
    const {firstName, fullName} = user;

    return (<span><Avatar info={user}/> <span style={{verticalAlign: 'middle'}}>{firstName}</span></span>);
}

export default UserWidget;
