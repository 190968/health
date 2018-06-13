import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input,Menu,Dropdown, DatePicker,Table,  Button, Icon, Tooltip} from 'antd';

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
        data: this.props.plans,
    };

    static defaultProps = {
        plans:[],
        plansTotal:0
    }
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');

        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.plans.map((record) => {
                const match = record.title.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    title: (
                        <span>
              {record.title.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
     onChange=(date, dateString)=> {

         this.setState({
             data: this.props.plans.map((record) => {
                 console.log(record,dateString)
                 return {
                     ...record,
                     date:(
                         (record.date > dateString[0] && record.date < dateString[1])? record.date : null

                     ),
                 };
             }).filter((data)=>{return data.date != null}),
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
            sorter: (a, b) => {
                var titleA = a.title.toUpperCase(); // ignore upper and lowercase
                var titleB = b.title.toUpperCase(); // ignore upper and lowercase
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }

                // names must be equal
                return 0;
            },
            // search
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
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'Inactive', value: false},
            ],
            onFilter: (value, record) => { console.log(value, record)},
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
            sorter: (a, b) => a.createdAt - b.createdAt,
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
        },];

        const dataSource = this.state.data;

        return (
                <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
        )
    }
}