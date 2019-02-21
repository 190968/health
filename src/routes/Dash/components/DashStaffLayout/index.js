import React from 'react';
import Patients from '../../../Manager/containers/Patients';

const DashStaffLayout  = props => {
    return <React.Fragment>
        <Patients limit={10} />
    </React.Fragment>;
}

export default DashStaffLayout