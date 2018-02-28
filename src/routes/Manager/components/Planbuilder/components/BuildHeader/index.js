import React from 'react';
import { Card, Input,Layout,Select,Form, DatePicker, Radio, Button, message } from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import Scheduling from './components/Scheduling';
const { TextArea } = Input;
const FormItem = Form.Item;
const {Header, Content} = Layout;
const createFormField = Form.createFormField;
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


class BuildHeader extends React.Component{

    constructor(props){
        super(props);

        this.state = {displayedFamily: props};
        this.stopLoading = this.stopLoading.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit, history, plan } = this.props;
        this.props.form.validateFields((err, values) => {
            //console.log(err);
            //console.log(values);
            if (!err) {
                this.setState({loading:true});
                return onSubmit(values).then(data => {
                    const {planUpdate} = data;
                    message.success('Updated');

                    this.stopLoading();

                    let mainUrl = '/pb/'+planUpdate.id+'/build/body';
                    history.push(mainUrl);
                });
            }
        });
    }
    stopLoading() {
        this.setState({ loading: false });
    }

    disabledDate = (current) => {
        // Can not select future
        return current && current > moment().endOf('day');

    }


    render(){
        const { intl,form, plan } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;


        return(
            <React.Fragment>
                <Header style={{background: '#fff', padding: 0}}>
                    <div style={{
                        height: 64,
                        padding: ' 8px 12px',
                        background: '#fff',
                        position: 'relative'
                    }}>

                    </div>
                </Header>
                <Content style={{margin: '16px'}}>
            <Form onSubmit={this.handleSubmit}>
            <Card title={intl.formatMessage(messages.pageTitle)}>

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('title', {
                        initialValue: ''

                    })(
                       <Input placeholder="ActionPlan Title" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.description)}
                >
                    {getFieldDecorator('description', {
                        initialValue: ''

                    })(
                        <TextArea placeholder="ActionPlan Description" autosize={{ minRows: 2}} />
                    )}
                </FormItem>




            </Card>

                <Scheduling form={form} formItemLayout={formItemLayout} tailFormItemLayout={tailFormItemLayout} />


                <FormItem style={{textAlign:'center'}}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        {intl.formatMessage(messages.continue)}
                    </Button>
                </FormItem>
            </Form>
                </Content>
            </React.Fragment>
        );
    }

}

const BuildHeaderForm = Form.create({
    mapPropsToFields(props) {
        const {plan} = props;
        if (!plan) {
            return;
        }
        console.log('mapPropsToFields', props);
        console.log(plan.schedule);
        console.log(typeof plan.schedule.limitStartDow);
        //const {type} =  plan.schedule;
        return {
            title: createFormField({
                value: plan.title,
            }),
            description: createFormField({
                value: plan.description,
            }),
            // schedule
            'schedule[type]': createFormField({
                value: plan.schedule.type,
            }),
            'schedule[limitStartDow]': createFormField({
                value: plan.schedule.limitStartDow,
            }),
            'schedule[limitDow]': createFormField({
                value: !!plan.schedule.limitStartDow,
            }),
            'schedule[dow]': createFormField({
                value: plan.schedule.dows,
            }),
            'schedule[relativeEndDay]': createFormField({
                value: plan.schedule.relativeEndDay,
            }),

            'startDate': createFormField({
                value: plan.schedule.startDate ? moment(plan.schedule.startDate) : null,
            }),
            'endDate': createFormField({
                value: plan.schedule.endDate ? moment(plan.schedule.endDate) : null,
            }),
        };
    }
})(BuildHeader);
export default withApollo(injectIntl(BuildHeaderForm));
