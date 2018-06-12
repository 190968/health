import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import Alerts from "../../../../../../layouts/components/Header/components/Notifications";

export const AssessmentsTable = props => {
    return (<Card title={'Alerts history'}>
        <Alerts {...props} />
    </Card>)
}

export default AssessmentsTable;