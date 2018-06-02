import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Menu,Dropdown,Card,Table,DatePicker,  Button, Icon, Tooltip} from 'antd';
import './index.css'
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

        // console.log(this.props.pathways.map((record) => {
        //    // console.log(dateString[0],moment(record.createdOn, dateFormat));
        //     return {
        //         ...record,
        //         createdOn:(
        //             (moment(record.createdOn, dateFormat) > date[0] && moment(record.createdOn, dateFormat) < date[1])? moment(record.createdOn, dateFormat) : null
        //
        //         ),
        //     };
        // }))
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
                sorter: (a, b) => {
                    let cancerA = a.cancer.toUpperCase(); // ignore upper and lowercase
                    let cancerB = b.cancer.toUpperCase(); // ignore upper and lowercase
                    if (cancerA < cancerB) {
                        return -1;
                    }
                    if (cancerA > cancerB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                },
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'statusText',
                render: (text, info) => {
                    console.log(info)
                    return info.status === '1' ? 'Published' : 'Draft';
                },
                filters: [
                    {text: 'Active', value: true},
                    {text: 'InActive', value: false},
                ],
                onFilter: (value, record) => record.isActive.includes(value),
                sorter: (a, b) => {
                    let statusA = a.status.toUpperCase(); // ignore upper and lowercase
                    let statusB = b.status.toUpperCase(); // ignore upper and lowercase
                    if (statusA < statusB) {
                        return -1;
                    }
                    if (statusA > statusB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                },
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
                sorter: (a, b) => {
                    let creatorA = a.creator.toUpperCase(); // ignore upper and lowercase
                    let creatorB = b.creator.toUpperCase(); // ignore upper and lowercase
                    if (creatorA < creatorB) {
                        return -1;
                    }
                    if (creatorA > creatorB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                },
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