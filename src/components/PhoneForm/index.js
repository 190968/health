import React, { PropTypes } from 'react';

import { Row, Input,Col,Select,Form } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

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



class PhoneForm extends React.Component{

    constructor(props){
        super(props);
    }

    static defaultProps = {
        required:false,
        phone: {code:'+1', number:''},
        prefix: 'phone'
    }



    render(){
        //console.log(this.props);
        const { form, intl, required, prefix, countries,  getFieldDecorator, phone } = this.props;
        //let {required} = this.props;

        const {code, number} = phone;

        return (
                <InputGroup compact >

                        {getFieldDecorator(prefix+'[code]', {
                            initialValue: code,
                            rules: [{ required: required, message: 'Please select code' }],
                        })(
                            <Select style={{width:'100px'}} notFoundContent="Loading...">
                                {countries.map(country => <Option key={country.id} value={country.id}>{country.phoneCode} ({country.name})</Option>)}
                            </Select>
                        )}
                        {getFieldDecorator(prefix+'[number]', {
                            initialValue: number,
                            rules: [{ required: required, message: "Please input your phone number."}/*, {type:'number', message: "Phone number consist of numbers only."}*/],
                        })(


                            <Input  style={{ width: '200px' }} />
                        )}


                </InputGroup>
        );
    }

}




const countriesQuery = gql`
   query getCountries {
    
    staticContent {
        
        countries {
            id
            name
            phoneCode
        }
         
    }
    
}
`;


const PhoneFormWithQuery = graphql(countriesQuery,
    {
        props: ({ownProps, data}) => {
            console.log(ownProps);
            if (!data.loading) {
                return {
                    ...ownProps,
                    countries: data.staticContent.countries,
                    loading: data.loading,
                }

            } else {
                return {...ownProps,loading: data.loading, countries: []}
            }
        },
    }
)(PhoneForm);

export default injectIntl(PhoneFormWithQuery);
