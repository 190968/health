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
 console.log(this.props);
        const suffix = this.props.searchText ? <Icon type="close-circle-o" onClick={this.props.emitEmpty}/> : <Icon type="search"/> 
         const marks = {
            0: '0',
            99: '99'
        };
        const {selectedCount,openShowButton,hideShowButton,showButton,selectedObj} = this.props;
        const columns = [
            {
                title: "Name",
                dataIndex: 'fullName',
                key: 'fullName',
                render: (title, info) => {
                    return <Link to={'/u/' + info.id}>{title}</Link>;
                },
                sorter: (a, b) => sort(a, b, "fullName"),
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
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width:100,
                sorter: (a, b) => a.age - b.age,
                filterDropdown: (
                    <div style={{width: 200, height: 60}} className="custom-filter-dropdown">
                        <Slider marks={marks} range defaultValue={[20, 50]} onChange={this.props.sliderChange}/>
                    </div>
                ),
                filterIcon: <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                width:120,
                render: (gender) => {
                    return gender[0].toUpperCase()
                },
                filters: [{
                    text: 'male',
                    value: 'male',
                }, {
                    text: 'female',
                    value: 'female',
                }],
                onFilter: (value, record) => record.gender.indexOf(value) === 0,
            },
            {
                title: 'Dignosis',
                dataIndex: 'getDiagnosis',
                key: 'getDiagnosis',
                //width:200,
                render: (getDiagnosis) => {
                    if (getDiagnosis) {
                        return <Truncate lines={1}>{getDiagnosis.code.name}</Truncate>
                    }
                },
            }, {
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
        const rowSelection = {
            
            onChange: (record,data) => (
                console.log("rowSelection",data),
                record.length < 1 ? hideShowButton() : openShowButton(data)
    
            ),
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };
        const dataSource = this.props.patients;
        console.log(selectedObj);
        return (
            <div>
                <Modal
                    title="Edit user"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <CustomModal id={this.state.id}/>
                </Modal>
                <Table  id="pasha" rowKey={'id'} rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false}
                       onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
                       {showButton && <InviteButtons selectedCount={selectedCount} selectedObj={selectedObj} />}
            </div>);
    }
}