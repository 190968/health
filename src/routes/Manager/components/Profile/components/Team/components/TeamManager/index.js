import React from 'react';
import {Card, Transfer, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const TeamManager = (props) => {
    const {teamMembers=[], items=[], form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange} = props;
    console.log(props);

    return <Transfer
        dataSource={items}
        showSearch
        operations={['Add', 'Remove']}
        listStyle={{
            width: 220,
            height: 300,
          }}
        // titles={['Source', 'Target']}
        render={item => {
            return <React.Fragment>
            {item.title} - <span style={{color:'#ccc', fontSize: '0.9em'}}>{item.description}</span>
            </React.Fragment>
        }}
        targetKeys={targetKeys}
        onChange={handleChange}
        // render={item => {
        //     //console.log(item);
        //     return item.title;
        // }}
    />
}

export default TeamManager;