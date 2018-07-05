import React from 'react';
import {Card, Transfer, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const TeamManager = (props) => {
    const {careTeam=[], items = [], form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange} = props;
    console.log(props);

    // const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    return <Transfer
        dataSource={items}
        showSearch
        operations={['Add', 'Remove']}
        // titles={['Source', 'Target']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={item => item.title}
    />
}

export default TeamManager;