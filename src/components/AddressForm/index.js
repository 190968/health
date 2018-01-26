import React, { PropTypes } from 'react';

import { Row, Input,Col,Select,Form } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import moment from 'moment';
import messages from './messages.json';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
const dateFormat = 'YYYY-MM-DD';



class AddressForm extends React.Component{

    constructor(props){
        super(props);
    }



    render(){
        const { intl,countries, states, getFieldDecorator, address } = this.props;
        const {line1, line2,country,city, state, zipcode} = address;

        const prefix = 'address';
        return (
            <div>
                {getFieldDecorator(prefix+'[line1]', {
                    initialValue: line1
                })(
                    <Input placeholder={'Line 1'} />
                )}
                {getFieldDecorator(prefix+'[line2]', {
                    initialValue: line2
                })(
                    <Input placeholder={'Line 2'} />
                )}
                <InputGroup >
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[country]', {
                            initialValue: country
                        })(
                            <Select placeholder={'Country'} style={{width:'100%'}}>
                                {countries.map(country => <Option key={country.id} value={country.id}>{country.name}</Option>)}

                            </Select>
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[city]', {
                            initialValue: city
                        })(
                            <Input placeholder={'City'} />
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[state]', {
                            initialValue: state
                        })(
                            <Select placeholder={'State'} style={{width:'100%'}}>
                                {states.map(state => <Option key={state.id} value={state.name}>{state.name}</Option>)}
                            </Select>
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[zipcode]', {
                            initialValue: zipcode
                        })(
                            <Input placeholder={'Zipcode'} />
                        )}
                    </Col>
                </InputGroup>
            </div>
        );
    }

}

export default injectIntl(AddressForm);
