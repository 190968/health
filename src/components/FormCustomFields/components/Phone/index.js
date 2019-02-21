import React from 'react';
import {Input,Select } from 'antd';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { CountrySelect } from '../../../Autosuggest/containers/CountrySelect';

const InputGroup = Input.Group;
const Option = Select.Option;



const TYPES = [
    {key:'mobile', label: 'Mobile'},
    {key:'home', label: 'Home'},
    {key:'work', label: 'Work'},
];
const PhoneFieldPure = props => {
    const {country, number, type, noType=false, pureField=false, disabled=false} = props;

    return (
            <InputGroup compact >
                    {!pureField && <CountrySelect value={country} usePhoneCode disabled={disabled} onChange={props.handleCode} style={{width:'90px'}} />}
                    
                        <Input value={number} disabled={disabled} onChange={props.handleNumber} style={{ width: '185px' }} />
                    {(!noType && !pureField) && <Select value={type} disabled={disabled} onChange={props.handleType} style={{width:'90px'}} placeholder="Type">
                            {TYPES.map(country => <Option key={country.key} value={country.key}>{country.label}</Option>)}
                    </Select>}

            </InputGroup>
    );
}
// class PhoneForm extends React.Component{


//     static defaultProps = {
//         required:false,
        
//         prefix: 'phone'
//     }



//     render(){

//         const { required, prefix, countries,  getFieldDecorator, phone } = this.props;
//         //let {required} = this.props;

        
//     }

// }

export const phoneFieldValidator = (rule, value, callback) => {
    const {required=false, message} = rule;
    if (!required) {
        callback();
    }
    if (!value) {
        callback(message);
    }

    // console.log(rule);
    // console.log(value);
    const {country, number, type} = value || {};
    //if ()
    if (!country) {
        callback('Enter Country');
    }
    if (!number) {
        callback('Enter Number');
    }
    // const form = props.form;
    // if (value && value !== form.getFieldValue('password')) {
    //     callback(this.props.intl.messages.user_inconsistent);
    // } else {
    //     callback();
    // }
    callback();
}


export const preparePhoneInput = value => {
    const {country, number, type} = value || {};
    if (number && number !== '') {
        const {id:countryId} = country || {};
        return {number, type, countryId};
    }
}
 
const enhance = compose(
    withHandlers({
        triggerChange: props => (value) => {
            const onChange = props.onChange;
            if (onChange) {
                onChange(value);
            }
        }
    }),
    withProps(props => {
        const {value} = props;
        const {country, number, type} = value || {};
        // const {id:countryId} = country || {};
        return {country, number, type}
    }),
    withState('country', 'setCode', props=> props.country),
    withState('number', 'setNumber', props=> props.number),
    withState('type', 'setType', props=> props.type),
    withHandlers({
        handleCode: props => (country) => {
            // const code = e.target.value;
            const {number, type} = props;
            props.setCode(country);
            props.triggerChange({country, number, type});
        },
        handleNumber: props => (e) => {
            const number = e.target.value;
            const {country, type} = props;
            props.setNumber(number);
            props.triggerChange({country, number, type});
        },
        handleType: props => (type) => {
            const {country, number} = props;
            props.setType(type);
            props.triggerChange({country, number, type});
        }
    }),
)

export const PhoneField = enhance(PhoneFieldPure);
export default PhoneField;
