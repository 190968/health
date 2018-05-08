import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';





export default class Workflow extends React.Component {
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
        plans:[],
        plansTotal:0
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
            //sorter: (a, b) => a.title.length - b.title.length,
            render: (title, info) => {
                return <Link to={'/pb/'+info.id}>{title}</Link>
            },
            // search
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
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'InActive', value: false},
            ],
            /*filteredValue: filteredInfo.isActive || null,*/
            // onFilter: (value, record) => record.isActive.includes(value),
            // sorter: (a, b) => a.isActive - b.isActive,
            // sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
        }];

        const plansTotal = this.props.plansTotal;
        const dataSource = this.props.plans;
        return (
            <Card type="table" title={'ActionPlans'+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')} extra={<Tooltip title="Add New Workflow"><Link to='/pb'><Button size="small"><Icon type="plus"  /></Button></Link></Tooltip>}>
                <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </Card>);
    }
}