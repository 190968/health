import React from 'react';
import UserDash from '../../containers/DashUserLayout'
import ManagerDash from '../../containers/DashManagerLayout'



class DashLayout extends React.Component {
    render() {
        //console.log(this.props);
        const {currentRole} = this.props;
        if (currentRole === 'patient') {
            return <UserDash />;
        } else {
            return <ManagerDash />;
        }
    }
}

export default DashLayout