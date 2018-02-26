/**
* Created by Павел on 12.02.2018.
*/
import React from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker ,Form, Input, InputNumber,Modal } from 'antd';

import { Link } from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;
const {Option} = Select;
class ModalMakeCommitmentsFor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }
    onChange = () => {
        this.setState({ visible: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit}  = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });

                return onSubmit(values);
            }
        });
    }

    render() {
        const  {loading} = this.props;
        if (loading) {
            return    <Modal>
                <Spin/>
            </Modal> ;
        }
        const {intl}=this.props;

        const {motivators,charitiesEnum}=this.props;
        const {edges}=motivators;

        const { getFieldDecorator } = this.props.form;
        const children = [];
        const enumChildren = [];
        edges.forEach(item =>{
            children.push(<Option key={item.id}>{item.user.firstName}</Option>);
    })
        charitiesEnum.forEach(item =>{
            enumChildren.push(<Option key={item.name}>{item.description}</Option>);
    })


        return  (

            <Modal
                style={{height:800, width: 800 }}
                title={intl.formatMessage(messages.make)+this.props.title}
                visible={true}
                onCancel={this.props.cancelParent}
                footer={[
                    <center> <Button type="primary" onClick={this.handleSubmit} htmlType="submit"  >{intl.formatMessage(messages.finish)}</Button></center>
                ]}
            >
                <div>
                    <Form onSubmit={this.handleSubmit} id="submitForm" className="login-form">


                        <Row>
                            <Col span={24}>
                                <p> {intl.formatMessage(messages.complete)}  {this.props.title}</p>
                            </Col>
                            <Col  span={6}>
                                <FormItem>
                                    {getFieldDecorator('date')(

                                        <DatePicker />
                                    )}

                                </FormItem>
                            </Col>
                            <Col offset={1} span={3}>
                                {intl.formatMessage(messages.will)}

                            </Col>
                        </Row>
                        <br/>
                        <Row>

                            <Col span={7}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />

                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.formatMessage(messages.pay)}</p>
                                            </span>
                                    <FormItem>
                                        {getFieldDecorator('motivators')(

                                            <Select
                                                mode="multiple"
                                                placeholder="Please select"
                                                onChange={this.handleChange}
                                            >
                                                {children}
                                            </Select>
                                        )}

                                    </FormItem>
                                    <Col style={{marginBottom: 10}} span={13}>
                                        <span>{intl.formatMessage(messages.howmuch)}</span>
                                    </Col>
                                    <Col style={{marginBottom: 10}} offset={1} span={10}>
                                        <FormItem>
                                            {getFieldDecorator('payment')(

                                                <InputNumber
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            )}

                                        </FormItem>
                                    </Col>
                                </center>
                            </Col>

                            <Col offset={2} span={7}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.formatMessage(messages.donate)}</p>
                                            </span>
                                    <FormItem>
                                        {getFieldDecorator('organization')(

                                            <Select placeholder="Please select" >
                                                {enumChildren}
                                            </Select>
                                        )}

                                    </FormItem>

                                    <Col style={{marginBottom: 10}} span={13}>
                                        <span>{intl.formatMessage(messages.howmuch)}</span>
                                    </Col>
                                    <Col style={{marginBottom: 10}} offset={1} span={10}>
                                        <FormItem>
                                            {getFieldDecorator('donate')(

                                                <Input
                                                    prefix="$"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                </center>
                            </Col>

                            <Col  offset={2}  span={5}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.formatMessage(messages.other)}</p>
                                            </span>

                                     <FormItem>
                                        {getFieldDecorator('description')(

                                            <Input />
                                        )}

                                    </FormItem>
                                </center>
                            </Col>



                        </Row>
                        <Row>
                            <Col  span={12}>
                                {intl.formatMessage(messages.add)}
                            </Col>
                            <Col    span={12}>
                                <FormItem>
                                    {getFieldDecorator('url')(

                                        <Input  />
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        );
    }
}

const WrappedModalMakeCommitmentsFor = Form.create()(ModalMakeCommitmentsFor);
export default injectIntl(WrappedModalMakeCommitmentsFor);
