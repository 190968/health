import React from 'react';
import {Card, Transfer, Checkbox, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';
import { ProviderSelect } from '../../../../../../../../components/Autosuggest/containers/ProviderSelect';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const ProvidersManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    return <Form>

        <FormItem
            {...formItemLayout}
            label="Select Provider"
        >
            {getFieldDecorator('providerId', {})(

                <ProviderSelect />
            )}
        </FormItem>

    </Form>
}

export default ProvidersManager;