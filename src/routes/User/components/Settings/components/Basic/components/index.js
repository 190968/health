import React from 'react';
import AddressForm from '../../../../../../../components/AddressForm';
import PhoneForm from '../../../../../../../components/PhoneForm';
import {compose, withState, withHandlers} from 'recompose';
import { Card, Input,Col,Select,Form, DatePicker,Button, message } from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl
} from 'react-intl';
import moment from 'moment';
import ru from './i18n/ru';
import en from './i18n/en';
import { DateField } from '../../../../../../../components/FormCustomFields';
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
//         id: 'user.firsht_name',
//         defaultMessage: 'First name',
//         description: 'First name',
//     },
// });


 const BasicSettingsForm  = props => {
        const {loading, loadingButton=false} = props;
        console.log(props);
        console.log(loadingButton);
        if (loading) {
            return (
                <Card loading bordered={false}> Loading...
                </Card>
            );
        }

        const {countries, states, account, languages, timezones} = props;
        const {user} = account;
        const phone = user.phone;




        const { intl,form } = props;
        const { getFieldDecorator } = form;
        const phoneNumberError = form.getFieldError('phone[number]');



        return(

        <Form onSubmit={props.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label={intl.messages.user_basic_title}
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
                label={intl.messages.user_name}
                required
            >
                <InputGroup >
                    <Col span={8}>
                        {getFieldDecorator('firstName', {
                            initialValue: user.firstName ,
                            rules: [{ required: true, message: intl.messages.user_first_name_rule, whitespace: true }],
                        })(
                        <Input placeholder={intl.messages.user_first_name} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('middleName', {
                            initialValue:user.middleName
                        })(
                        <Input  placeholder={intl.messages.user_middle_name} />
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('lastName', {
                            initialValue: user.lastName,
                            rules: [{ required: true, message:intl.messages.user_last_name_rule}],
                        })(
                        <Input placeholder={intl.messages.user_last_name} />
                        )}
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.messages.user_birthday}

            >
                {getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday),
                    rules: [{
                        type: 'object', message:intl.messages.user_birthday_novalid,
                    }, {
                        required: true, message:intl.messages.user_birthday_rule,
                    }],
                })(
                    <DateField allowClear={false} />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.messages.user_gender}

            >
                {getFieldDecorator('gender', {
                initialValue: user.gender,
                rules: [{ required: true, message:intl.messages.user_gender_rule, whitespace: true }],
            })(
                <Select style={{ width: 120 }} >
                    <Option value="female">{intl.messages.user_female}</Option>
                    <Option value="male">{intl.messages.user_male}</Option>
                </Select>
            )}
            </FormItem>


            <FormItem
                {...formItemLayout}
                label={intl.messages.user_email}

            >{getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{ required: true, type: 'email', message:intl.messages.user_email_rule,}],
            })(
                <Input  placeholder={intl.messages.user_email} />
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.messages.user_phone_number}
                required
                validateStatus={phoneNumberError ? 'error' : ''}
                help={phoneNumberError || ''}
            >
                <PhoneForm getFieldDecorator={getFieldDecorator} required phone={phone} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.messages.user_address}
            >
                <AddressForm getFieldDecorator={getFieldDecorator} countries={countries} states={states} address={user.address} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.messages.user_language}

            > {getFieldDecorator('language', {
                initialValue: user.language,

            })(
                <Select placeholder={intl.messages.user_language_rule}  >
                    {languages.map(language => <Option key={language.value} value={language.value}>{language.label}</Option>)}
                </Select>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.messages.user_timezone}

            > {getFieldDecorator('timezone', {
                initialValue: user.timezone,
            })(
                <Select placeholder={intl.messages.user_timezone_rule}>
                    {timezones.map(timezone => <Option key={timezone.id} value={timezone.id}>{timezone.name}</Option>)}
                </Select>
            )}
            </FormItem>


            <FormItem
                {...formItemLayout}
                label={intl.messages.user_dateformat}

            > {getFieldDecorator('dateFormat', {
                initialValue: user.dateFormat
            })(
                <Select style={{ width: 150 }} >
                    <Option value={1}>MM/DD/YY</Option>
                    <Option value={2}>DD/MM/YY</Option>
                </Select>
            )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
                <Button loading={loadingButton} type="primary" htmlType="submit" className="register-form-button">
                    {intl.messages.user_submit}
                </Button>
            </FormItem>
        </Form>

              );

}

const enhance = compose(
    //withState(),
    injectIntl,
    Form.create(),
    withHandlers({
        handleSubmit: props => (e) => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
                if (!err) {
                    props.updateInfo(values).then(({data}) => {

                        message.success('Updated');
                        props.setLoadingButton(false);
                        props.updateCurrentUserInfo(data.updateUser);
                        //dispatch(loadFullUser(data.updateUser));
                    })
                }
            });
        }
    })
);
export default enhance(BasicSettingsForm);
