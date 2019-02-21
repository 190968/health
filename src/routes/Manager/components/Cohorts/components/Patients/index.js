import React from 'react';
import {Card} from 'antd';
import { TableWithMessage } from '../../../../../../components/Tables';
import moment from 'moment';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import SettingsDropdown from '../../../../../../components/UI/SettingsDropdown';
import CohortDeleteUserButton from '../Buttons/containers/DeleteUser';
import { CohortPatientsButtons } from './containers/Buttons';
import CohortUserManagerButton from '../Buttons/components/ManageUser';

const CohortPatients = props => {
    console.log(props);
    const {cohortUsers=[], cohort, total, loading, showAdd=true} = props;


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
        }, {
            title: '',
            key: 'act',
            width:50,
            render: (info) => {
                const items = [
                    {key:'delete', content:  <CohortDeleteUserButton button={false} label={'Edit'} refetch={props.refetch} cohortUser={info} asMenuItem />},
                    // {key:'delete', content: <TransitionDeleteButton user={user} transition={info} onDelete={props.refetch} asMenuItem />}
                ];
                return <SettingsDropdown items={items} />
            }
            }
    ];

    // const rowSelection = {
    //     // onChange: (record,data) => (
    //     //     record.length < 1 ? hideShowButton() : openShowButton(data)
            
    //     // ),
    //     getCheckboxProps: record => ({
    //         name: record.title,
    //     }),
    // };
    
    const { selectedRowKeys } = props;
    const rowSelection = {
      selectedRowKeys,
      onChange: props.onSelectedRowKeysChange,
    };

    return <React.Fragment>
        {showAdd && <div style={{textAlign:'right', marginBottom:10}}>
        <CohortUserManagerButton cohort={cohort} role={'patient'} type={'ghost'} refetch={props.refetch} label={'Add User'} icon={'plus'} />
        </div>}
        <Card type="table">
    <TableWithMessage
        emptyMessage={'No Patients in this cohort'}
        columns={columns} 
        dataSource={cohortUsers} 
        loading={loading}

        rowSelection={rowSelection}
        showFooter={true} 
        rowKey={'id'}
        buttons={<CohortPatientsButtons selectedRowKeys={selectedRowKeys} dataSource={cohortUsers}  />}
    />
</Card>
</React.Fragment>;
}

export default CohortPatients;