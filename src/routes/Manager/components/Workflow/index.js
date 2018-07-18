import React from 'react';
import moment from 'moment';
import {Table, Input, Button, Icon, Tooltip, Radio} from 'antd';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class WorkFlow extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: {},
    };

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {

        let {sortedInfo} = this.state;
        const suffix = this.props.searchText ? <Icon type="close-circle-o" onClick={this.props.emitEmpty}/> : <Icon type="search"/>
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            filterDropdown: (
                    <Input
                         suffix={suffix}
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                         value={this.props.searchText}
                        onChange={this.props.onSearch}
                        onPressEnter={this.props.onSearch}
                    />
            ),
            filterIcon: <Icon type="search"/>,
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            render: (text, info) => {
                return  moment(info.createdAt).format('L');
            },
        }, {
            title: 'By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            sorter: (a, b) => a.createdBy - b.createdBy,
            filterDropdown: (
                    <Input
                         suffix={suffix}
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        // value={searchText}
                        //onChange={onSearch}
                        //onPressEnter={onSearch}
                    />
            ),
            filterIcon: <Icon type="search"/>,
        }, {
            title: 'Downloads',
            dataIndex: 'downloads',
            key: 'downloads',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];

        const dataSource = [];
        const total = 0;
        const actions = <React.Fragment>
            <RadioGroup defaultValue="all" style={{marginRight: 10}}>
                <RadioButton value="all">All</RadioButton>
                <RadioButton value="open">Open</RadioButton>
                <RadioButton value="past">Past</RadioButton>
            </RadioGroup>
            <Tooltip title="Add New Workflow"><Button type="primary"><Icon type="plus"/></Button></Tooltip>

        </React.Fragment>;
        return (
            <React.Fragment>
                <PageHeaderLayout title={'Workflow ' + (total > 0 ? ' (' + total + ')' : '')}
                                  content=""
                                  action={actions}
                >

                    <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                           ref={(input) => {
                               this.table = input;
                           }}/>
                </PageHeaderLayout>
            </React.Fragment>);
    }
}