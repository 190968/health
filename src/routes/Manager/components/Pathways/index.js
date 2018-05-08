import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';

export default class Pathways extends React.Component {
    state = {
        // for search
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
    };

    static defaultProps = {
        pathways:[],
        total:0
    }

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {
        const {loading} = this.props;
        let { sortedInfo } = this.state;
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => {
                var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            },
            render: (title, info) => {
                return <Link to={'/pb/'+info.id}>{title}</Link>
            },
            // // search
            // filterDropdown: (
            //     <div className="custom-filter-dropdown">
            //         <Input
            //             ref={ele => this.searchInput = ele}
            //             placeholder="Search name"
            //             value={this.state.searchText}
            //             onChange={this.onInputChange}
            //             onPressEnter={this.onSearch}
            //         />
            //         <Button type="primary" onClick={this.onSearch}>Search</Button>
            //     </div>
            // ),
            // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            // filterDropdownVisible: this.state.filterDropdownVisible,
            // onFilterDropdownVisibleChange: (visible) => {
            //     this.setState({
            //         filterDropdownVisible: visible,
            //     }, () => this.searchInput && this.searchInput.focus());
            // },
        },
            {
            title: 'Cancer',
            dataIndex: 'cancer',
            key: 'cancer',
            render: (text, info) => {
                return info.cancer.title || ''
            },
            // filters: [
            //     {text: 'Active', value: true},
            //     {text: 'InActive', value: false},
            // ],
            // /*filteredValue: filteredInfo.isActive || null,*/
            // onFilter: (value, record) => record.isActive.includes(value),
            // sorter: (a, b) => a.isActive - b.isActive,
            // sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        },
             {
            title: 'Status',
            dataIndex: 'status',
            key: 'statusText',
            render: (text, info) => {
                return info.status === '1' ? 'Published' : 'Draft';
            },
            // filters: [
            //     {text: 'Active', value: true},
            //     {text: 'InActive', value: false},
            // ],
            // /*filteredValue: filteredInfo.isActive || null,*/
            // onFilter: (value, record) => record.isActive.includes(value),
            // sorter: (a, b) => a.isActive - b.isActive,
            // sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        },
            {
            title: 'Created',
            dataIndex: 'createdOn',
            key: 'date',
            render: (info) => moment(info).format('L'),
        },
             {
                title: 'By',
                dataIndex: 'creator',
                key: 'creator',
                render: (user, info) => {
                    return <Link to={'/u/'+info.creator.id}>{info.creator.fullName}</Link>
                },
                // filters: [
                //     {text: 'Active', value: true},
                //     {text: 'InActive', value: false},
                // ],
                // /*filteredValue: filteredInfo.isActive || null,*/
                // onFilter: (value, record) => record.isActive.includes(value),
                // sorter: (a, b) => a.isActive - b.isActive,
                // sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
            },
            { title: '', dataIndex: '', align:'right', key: 'x', render: () => <React.Fragment><Icon type="edit" /> <Icon type="delete" /></React.Fragment> },
        ];

        const {pathways, total} = this.props;
        return (
            <Card type="table" title={'Pathways'+ (total > 0 ? ' ('+total+')' : '')} extra={<Tooltip title="Add New Pathway"><Link to='/pb/type/pathway'><Button size="small" type="primary" ghost={true} icon="plus" /></Link></Tooltip>}>
                <Table dataSource={pathways} loading={loading} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </Card>);
    }
}