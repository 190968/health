import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import StageLetters from './containers/StageLetters';
import StageRules from './components/StageRules';
import './index.less';
import { Modal, Form, Steps, Button, message } from 'antd';

const Step = Steps.Step;
const FormItem = Form.Item;
const createFormField = Form.createFormField;



class StageManager extends React.Component {

    defaultProps = {
        stage: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.goTo(current);
    }
    prev() {
        const current = this.state.current - 1;
        this.goTo(current);
    }

    goTo(current) {
        // check if we've added at least one
        const form = this.props.form;

        this.props.form.validateFields((err, values) => {

            if (!err) {
                /* const letters = form.getFieldValue('letters');
                 if (current === 1) {
                     if (letters && letters.length == 0) {
                         // show error
                         return false;
                     }
                 }*/
                this.setState({current});
            }
        });
    }

    handleSubmit = (e) => {

        this.props.onSubmit();
    }

        render() {
            const { current, stage } = this.state;

            //console.log(this.props.form.getFieldsValue());
            const steps = [{
                title: 'Manage Letters',
                content: <StageLetters form={this.props.form} stage={stage} />,
            }, {
                title: 'Manage Rules',
                content: <StageRules form={this.props.form} stage={stage} />,
            }];

            return (
                
                <Form>
                    <Steps current={current} size="small" progressDot>
                        {steps.map((item, i) => <Step key={item.title} title={item.title} onClick={() => this.goTo(i)} />)}
                    </Steps>
                    {steps.map((item, i) => <div key={item.title} className="steps-content" style={{display:(this.state.current === i ? '' : 'none')}}>{item.content}</div>)}
                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        }

                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={this.handleSubmit}>Done</Button>
                        }

                    </div>
                </Form>
            );
        }
}

export default StageManager;