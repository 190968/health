import React from 'react';
import {Card,Input,DatePicker,Button,Icon, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import './index.css'
import sort from '../../../../../../components/Tables/sort'
import Search from '../../../../../../components/Tables/search/functions'
const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
export const UserProvidersTable = props => {

    const {providers=[], loading=false,searchText,filterDropdownVisible=true,onChange} = props;
    const total = providers.length;
    const columns = [{
        title: 'Name',
        key: 'name',
        render: (info) => {
            return <Truncate lines={1} >{info.provider.name}</Truncate>
        },
        sorter: (a, b) => sort(a,b,"provider","name"),
        filterDropdown: (<Search obj={providers} />),
        filterIcon: <Icon type="search"  />
    },
        {
            title: 'Added',
            key: 'sender',
            render: (info) => {
                return <AvatarWithName user={info.sender} />
            },
            sorter: (a, b) => sort(a,b,"sender"),
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.joinedDate - b.joinedDate,
            filterDropdown: (
                <div  className="custom-filter-dropdown">
                    <RangePicker
                        onChange={onChange}
                        ranges={{'This Year': [moment(), moment().endOf('year')] }}
                        defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                        format={dateFormat}
                    />
                </div>
            ),
            filterIcon: <Icon type="filter" />,
        },

    ];
 
     const dataSource = providers;
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic1  ant-card-type-table" title={'Providers '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserProvidersTable;