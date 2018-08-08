import React from 'react';
import UserDash from '../../containers/DashUserLayout'
import ManagerDash from '../../containers/DashManagerLayout'



const  DashLayout  = props => {
    const {currentUser={}} = props;
    const {currentRole} = currentUser;
    console.log(props, 'Dash props');
    if (currentRole === 'patient') {
        return <UserDash />;
    } else if (currentRole) {
        return <ManagerDash />;
    } else {
        return null;
    }
}

export default DashLayout