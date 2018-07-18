import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Dropdown, Menu, Slider, Input, Icon, Modal} from 'antd';
import CustomModal from '../../containers/Modal'
import Truncate from 'react-truncate';
import InviteButtons from "../../../../../../components/Tables/InviteButton/index";

import sort from '../../../../../../components/Tables/sort'
import './index.css'

export default class TableCustom extends React.Component {

    state = {
        // for search
        filterDropdownVisible: false,
        settingDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
        data: this.props.patients,
        visible: false,
        id: null
    };

    static defaultProps = {
        plans: [],
        plansTotal: 0
    }
 
    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
   
    showModal = (id) => {
        this.setState({
            visible: true,
            id: id
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
 


    render() {
        const {loading} = this.props;
        let {sortedInfo} = this.state;
 
        const suffix = this.props.searchText ? <Icon type="close-circle-o" onClick={this.props.emitEmpty}/> : <Icon type="search"/> 
         const marks = {
            0: '0',
            99: '99'
        };
        const {selectedCount,openShowButton,hideShowButton,showButton} = this.props;
        const columns = [
            {
                title: "Name",
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => sort(a, b, "name"),
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
            },
            {
                title: "Categories",
                dataIndex: 'categories',
                key: 'categories',
                render: (categories,data) => {
                    return data.name
                },
                sorter: (a, b) => sort(a, b, "categories","name"),
            },
            {
                title: "Type",
                dataIndex: 'typeText',
                key: 'typeText',
            },
            {
                title: "Referrals",
                dataIndex: 'getReferrals',
                key: 'getReferrals',
                sorter: (a, b) => a.getReferrals -b.getReferrals,
            },
            {
                title: "Reviews",
                dataIndex: 'getReviews',
                key: 'getReviews',
                render: (categories,data) => {
                    return <React.Fragment><Icon style={{ fontSize: 15, color: '#FFFF00' }} type="star" />
                                           <Icon style={{ fontSize: 15, color: '#FFFF00' }} type="star" />
                                           <Icon style={{ fontSize: 15, color: '#FFFF00' }} type="star" />
                                           <Icon style={{ fontSize: 15, color: '#FFFF00' }} type="star" />
                                           <Icon style={{ fontSize: 15, color: '#FFFF00' }} type="star" /></React.Fragment>
                },
            },
             {
                title: '',
                width:50,
                render: (info) => {
                    const menu = (
                        <Menu>
                            <Menu.Item onClick={this.showModal.bind(this, info.id)}>
                                <Icon type="edit"/> Edit
                            </Menu.Item>
                        </Menu>
                    );
                    return <Dropdown overlay={menu} trigger={['click']}>
                        <Icon type="setting"/>
                    </Dropdown>;
                }
            },
        ];
        // const rowSelection = {
        //     onChange: record => (
        //         record.length < 1 ? hideShowButton() : openShowButton(record.length)
    
        //     ),
        //     getCheckboxProps: record => ({
        //         name: record.name,
        //     }),
        // };
        const dataSource = this.props.programs;
        return (
            <div>
                <Modal
                    title="Edit user"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <CustomModal id={this.state.id}/>
                </Modal>
                <Table  dataSource={dataSource} columns={columns} pagination={false}
                       onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
                       {showButton && <InviteButtons selectedCount={selectedCount} />}
            </div>);
    }
}