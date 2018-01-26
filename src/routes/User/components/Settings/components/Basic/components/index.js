/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';
import AddressForm from '../../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../../components/PhoneForm';

import { Card, Input,Col,Select,Form, DatePicker, Radio, Button, } from 'antd';
import { withApollo, gql } from 'react-apollo'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import moment from 'moment';
import messages from '../../basic.json';
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
//const dateFormat = 'YYYY/MM/DD';

// const messages = defineMessages({
//     first_name: {
//         id: 'user.first_name',
//         defaultMessage: 'First name',
//         description: 'First name',
//     },
// });


 class SettingForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
        this.stopLoading = this.stopLoading.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading:true});
                return onSubmit(values, this.stopLoading);
            }
        });
    }
     stopLoading() {
         this.setState({ loading: false });
     }


    render(){
        const settingsPlaceholder = [];
        // settingsPlaceholder.push(  {
        //     item:
        //
        // })
        if (this.props.loading) {
            return (
                <Card loading bordered={false}> Loading...
                </Card>
            );
        }
       // console.log(this.props.account.user.birthday);
        const {dateFormat, countries, states, account, languages, timezones,} = this.props;
        const {user} = account;
        const phone = user.phone;



        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;



        return(

        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                    initialValue: user.title

                })(

                    <Select style={{ width: 120 }} >
                        {user.possibleTitles.map((title, i) => <Option key={title} value={i}>{title}</Option>)}
                    </Select>
                )}


            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.name)}
                required
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('firstName', {
                            initialValue: user.firstName ,
                            rules: [{ required: true, message: intl.formatMessage(messages.first_name), whitespace: true }],
                        })(
                        <Input placeholder={intl.formatMessage(messages.first_name)} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middleName', {
                            initialValue:user.middleName
                        })(
                        <Input  placeholder={intl.formatMessage(messages.middle_name)} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('lastName', {
                            initialValue: user.lastName,
                            rules: [{ required: true, message:intl.formatMessage(messages.last_name_rule)}],
                        })(
                        <Input placeholder={intl.formatMessage(messages.last_name)} />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.birthday)}

            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday),
                    rules: [{
                        type: 'object', message:intl.formatMessage(messages.novalid),
                    }, {
                        required: true, message:intl.formatMessage(messages.rule),
                    }],
                })(
                    <DatePicker format={dateFormat} allowClear={false} />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.gender)}

            >
                {getFieldDecorator('gender', {
                initialValue: user.gender,
                rules: [{ required: true, message:intl.formatMessage(messages.gender_rule), whitespace: true }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value="female">{intl.formatMessage(messages.female)}</Option>
                    <Option value="male">{intl.formatMessage(messages.male)}</Option>
                </Select>
            )}
            </FormItem>


            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.email)}

            >{getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{ required: true, type: 'email', message:intl.formatMessage(messages.email_rule),}],
            })(
                <Input  placeholder={intl.formatMessage(messages.email)} />
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.phone_number)}
                required
            >
                <PhoneForm getFieldDecorator={getFieldDecorator} required phone={phone} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.address)}
            >
                <AddressForm getFieldDecorator={getFieldDecorator} countries={countries} states={states} address={user.address} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.language)}

            > {getFieldDecorator('language', {
                initialValue: user.language,

            })(
                <Select placeholder={intl.formatMessage(messages.language_rule)}  >
                    {languages.map(language => <Option key={language.value} value={language.value}>{language.label}</Option>)}
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.timezone)}

            > {getFieldDecorator('timezone', {
                initialValue: user.timezone,
            })(
                <Select placeholder={intl.formatMessage(messages.timezone_rule)}>
                    {timezones.map(timezone => <Option key={timezone.id} value={timezone.id}>{timezone.name}</Option>)}
                </Select>
            )}
            </FormItem>


            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.dateformat)}

            > {getFieldDecorator('dateFormat', {
                initialValue: user.dateFormat
            })(
                <Select style={{ width: 120 }} >
                    <Option value={1}>MM/DD/YY</Option>
                    <Option value={2}>DD/MM/YY</Option>
                </Select>
            )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
                <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                    {intl.formatMessage(messages.submit)}
                </Button>
            </FormItem>
        </Form>

              );
    }

}

const WrappedSettingForm = Form.create()(SettingForm);
export default withApollo(injectIntl(WrappedSettingForm));
