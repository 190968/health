import React from 'react';
import {Card, Table} from 'antd';
import Alerts from "../../../../../../layouts/components/Header/components/Notifications";

export const AssessmentsTable = props => {
    console.log(props);
    return (<Card title={'Alerts History'}>
        <Alerts {...props} />
    </Card>)
}

export default AssessmentsTable;