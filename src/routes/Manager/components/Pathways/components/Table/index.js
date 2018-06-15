import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Menu,Dropdown,Card,Table,DatePicker, Button, Icon, Tooltip} from 'antd';
import './index.css'
import sort from '../../../../../../components/Tables/sort'
const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
export default class TableCustom extends React.Component {
    state = {
        // for search
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
        data: this.props.pathways,
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

    onChange=(date, dateString)=> {
        this.setState({
            data: this.props.pathways.map((record) => {
                return {
                    ...record,
                    createdOn:(
                        (moment(record.createdOn, dateFormat) > date[0] && moment(record.createdOn, dateFormat) < date[1])? moment(record.createdOn, dateFormat) : null

                    ),
                };
            }).filter((data)=>{return data.createdOn != null}),
        });
    }
    render() {
        const {loading} = this.props;
        let { sortedInfo } = this.state;
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, info) => {
                return <Link to={'/pb/'+info.id}>{title}</Link>
            },
             sorter: (a, b) => sort(a,b,"title"),
            // // search
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },
            {
                title: 'Cancer',
                dataIndex: 'cancer',
                key: 'cancer',
                render: (text, info) => {
                    return info.cancer.title || ''
                },
                filters: [
                    {text: 'Active', value: true},
                    {text: 'InActive', value: false},
                ],
                //     onFilter: (value, record) => record.cancer.indexOf(value) === 0,
                sorter: (a, b) => sort(a,b,"cancer"),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'statusText',
                render: (text, info) => {
                    return info.status === '1' ? 'Published' : 'Draft';
                },
                filters: [
                    {text: 'Active', value: true},
                    {text: 'InActive', value: false},
                ],
                onFilter: (value, record) => record.isActive.includes(value),
                sorter: (a, b) => sort(a,b,"status"),
            },
            {
                title: 'Created',
                dataIndex: 'createdOn',
                key: 'date',
                render: (info) => moment(info).format('L'),
                filterDropdown: (
                    <div  className="custom-filter-dropdown">
                        <RangePicker
                            onChange={this.onChange}
                            defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                            format={dateFormat}
                        />
                    </div>
                ),
                filterIcon: <Icon type="filter" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            },
            {
                title: 'By',
                dataIndex: 'creator',
                key: 'creator',
                render: (user, info) => {
                    return <Link to={'/u/'+info.creator.id}>{info.creator.fullName}</Link>
                },
                filters: [
                    {text: 'Active', value: true},
                    {text: 'InActive', value: false},
                ],
                // filteredValue: filteredInfo.isActive || null,
                onFilter: (value, record) => record.isActive.includes(value),
                sorter: (a, b) => sort(a,b,"creator"),
            },{
                title: 'Actions',

                render: (info) => {
                    const menu = (
                        <Menu>
                            <Menu.Item >
                                <Icon  type="edit"/> Edit
                            </Menu.Item>
                            <Menu.Item >
                                <Icon  type="delete"/> Delete
                            </Menu.Item>
                        </Menu>
                    );
                    return <Dropdown  overlay={menu} trigger={['click']}>
                        <Icon type="setting" />
                    </Dropdown>;
                }
            },
        ];

        const dataSource = this.state.data;
        return (
                <Table dataSource={dataSource} loading={loading} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
        )

    }
}