import React from 'react';
import UserDash from '../../containers/DashUserLayout'
import ManagerDash from '../../containers/DashManagerLayout'
import StaffDash from '../../containers/DashStaffLayout'



const DashLayout  = props => {
    const {isUserRole, currentUser} = props;
    const {currentRole} = currentUser;
    if (isUserRole(['patient', 'guest'])) {
        return <UserDash />;
    } else if (isUserRole('manager')) {
        return <ManagerDash />;
    // } else if (isUserRole('advocate')) {
    } else if (currentRole) {
        return <StaffDash />;
    } else {
        return null;
    }
}

export default DashLayout