import React from 'react';
import {Card,Input,Button,Icon, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import './index.css'


export const UserProvidersTable = props => {

    const {providers=[], loading=false,searchText,onInputChange,onSearch} = props;
    const total = providers.length;
    const columns = [{
        title: 'Name',
        key: 'title',
        render: (info) => {
            return <Truncate lines={1} >{info.provider.name}</Truncate>
        },
        sorter: (a, b) => {
            let nameA = a.provider.name.toUpperCase();
            let nameB = b.provider.name.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        },
        filterDropdown: (
            <div className="custom-filter-dropdown">
                <Input
                     ref={ele => this.searchInput = ele}
                    placeholder="Search name"
                     value={searchText}
                      onChange={onInputChange}
                     onPressEnter={onSearch}
                />
                <Button type="primary" onClick={onSearch} >Search</Button>
            </div>
        ),
        filterIcon: <Icon type="search"  />,
        // filterDropdownVisible: this.state.filterDropdownVisible,
        // onFilterDropdownVisibleChange: (visible) => {
        //     this.setState({
        //         filterDropdownVisible: visible,
        //     }, () => this.searchInput && this.searchInput.focus());
        // },
    },
        {
            title: 'Added',
            key: 'sender',
            render: (info) => {
                return <AvatarWithName user={info.sender} />
            },
            sorter: (a, b) => {
                let addedA = a.sender.toUpperCase(); 
                let addedB = b.sender.toUpperCase(); 
                if (addedA < addedB) {
                    return -1;
                }
                if (addedA > addedB) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
        },

    ];
    // const faceData = [{id:1,provider:{id:1,"name":"bbbbb"},sender:{},joinedDate:"2016-01-01"},
    //                   {id:2,provider:{id:1,"name":"aaaaa"},sender:{},joinedDate:"2016-02-01"},
    //                   {id:3,provider:{id:1,"name":"ccccc"},sender:{},joinedDate:"2016-02-01"}];
     const dataSource = providers;
    // const dataSource = faceData;
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