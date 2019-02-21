import React from 'react';
import {Card} from 'antd';
import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import AvatarWithName from '../../../../../User/components/AvatarWithName';

const CohortTeam = props => {
    const {cohortTeam=[], total, loading} = props;


    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: info => {
                const {user} = info;
                return <AvatarWithName user={user} />;
            }
        }, {
            title: 'Age',
            key: 'age',
            render: info => {
                const {age} = info.user || {};
                return age;
            }
        }, {
            title: 'Gender',
            key: 'gender',
            render: info => {
                const {genderText} = info.user || {};
                return genderText;
            }

        }, {
            title: 'Added',
            key: 'startDate',
            dataIndex: 'startDate',
            render: date => date && moment(date).format('l')
        }
    ];

    const rowSelection = {
        // onChange: (record,data) => (
        //     record.length < 1 ? hideShowButton() : openShowButton(data)
            
        // ),
        getCheckboxProps: record => ({
            name: record.title,
        }),
    };
    
    return  <Card type="table">
    <TableWithMessage
        emptyMessage={'No Team Members in this Cohort'}
        rowSelection={rowSelection} 
        columns={columns} dataSource={cohortTeam} 
        loading={loading}
    />
</Card>;
}

export default CohortTeam;