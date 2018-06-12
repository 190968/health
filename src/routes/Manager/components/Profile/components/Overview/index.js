import React from 'react';
import ActionPlans from "../../components/Dashboard/containers/ActionPlans";
import Assessments from '../../containers/Assessments';
import Tasks from '../../containers/Tasks';
const Overview = props => {
    console.log(props);
    const {user={}} = props;
    const {id:userId} = user;
    return <React.Fragment>
        <ActionPlans userId={userId} />
        <Tasks userId={userId} />
        <Assessments user={user} />
    </React.Fragment>
}

export default Overview;