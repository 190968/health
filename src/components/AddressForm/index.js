import React from 'react';

import {Input,Col,Select } from 'antd';
import {
    injectIntl
} from 'react-intl';

const InputGroup = Input.Group;
const Option = Select.Option;
class AddressForm extends React.Component{



    render(){
        const { countries, states, getFieldDecorator, address } = this.props;
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
