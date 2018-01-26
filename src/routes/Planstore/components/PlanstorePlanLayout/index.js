import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import moment from 'moment';

import { arrayChunk, intersperse } from '../../../../utils/main';

// add placeholders
import { Card, Modal, Row, Col, Button, message, Form ,Popover, Radio, DatePicker} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



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
const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, confirmLoading, onCancel, onSubmit, onChangeEnd, checkEndDate, form, plan, end_date } = props;
        const { getFieldDecorator } = form;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '33px',
        };


        return (
            <Modal
                title={'Set your ActionPlan:' + plan.title}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={onCancel} onOk={onSubmit}>
                <Form >
                    <Card title="Privacy" type="inner">
                        <FormItem
                            {...formItemLayout}
                            label="Privacy"
                        >
                            {getFieldDecorator('privacy', {
                                rules: [{
                                    required: true, message: 'Please Select',
                                }],
                            })(
                                <RadioGroup>
                                    <Popover content="Visible to anyone">
                                        <RadioButton value="open">Open
                                        </RadioButton>
                                    </Popover>
                                    <Popover content="Visible to you">
                                        <RadioButton value="private">Private</RadioButton>
                                    </Popover>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Card>

                    <Card title="Scheduling"  type="inner">
                        <FormItem
                            {...formItemLayout}
                            label="Start Date"
                        >
                            {getFieldDecorator('start_date', {
                                initialValue: moment(),
                                rules: [{
                                    required: true, message: 'Please Select Start Date',
                                }],
                            })(
                                <DatePicker allowClear={false}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="End Date"
                        >
                            {getFieldDecorator('end_date_set', {
                                rules: [{
                                    required: true, message: 'Please Select End Date',
                                }],
                            })(
                                <RadioGroup onChange={onChangeEnd}>
                                    <Radio style={radioStyle} value={false}>Never</Radio>
                                    <Radio style={radioStyle} value={true}>
                                        On {end_date === true ?

                                        getFieldDecorator('endDate', {
                                            rules: [{
                                                validator: checkEndDate, message: 'End date must be after Start Date',
                                            }],
                                        })(
                                            <DatePicker/>
                                        )

                                        : null}
                                    </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>


                    </Card>
                </Form>


            </Modal>
        );
    }
)



export class PlanstorPlanLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmLoading: false,
            end_date:0
        };
        this.checkEndDate = this.checkEndDate.bind(this);
    };
    static propTypes = {
        plan: PropTypes.object,
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    hideModal = () => {
        this.setState({modalIsOpen: false});
    }
    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }


    planDetails()
    {
        const {plan} = this.props;
        const {start_date, end_date, gender, language, elements, categories} = plan;
        const details = [];
        if (start_date !== '') {
            details.push(['Start Date', start_date]);
        }
        if (end_date !== '') {
            details.push(['End Date', end_date]);
        }
        if (gender !== '') {
            details.push(['Gender', gender]);
        }
        if (gender !== '') {
            details.push(['Language', language]);
        }

        if (categories.length > 0) {
            const communities = categories.map(el => {
                return <Link to={'/community/'+el.id} key={el.id}>{el.name}</Link>;
            });
            details.push(['Categories', intersperse(communities, ', ')]);
        }
        //console.log(elements);
        if (elements.length > 0) {
            const inside = elements.map(el => {
                return <div key={el[1]}><i className={el[0]+' bump-r'}></i>{el[1]}</div>;
            });
            //console.log(inside);
            details.push(['Inside',inside]);
        }
        //console.log(details);
        const chunks = Math.ceil(details.length/2);
        //console.log(chunks);
        const chunked_arr = arrayChunk(details, chunks);
        const cols = [];
        for (var i=0,j=chunked_arr.length; i<j; i++) {
            //console.log(i);
            cols[i] = chunked_arr[i].map(el => {
                return <React.Fragment key={el[0]}>
                    <Col md={6}>
                        <strong>{el[0]}:</strong>
                    </Col>
                    <Col md={6} >
                        {el[1]}
                    </Col>
                </React.Fragment>;
                //console.log(el.key);
            });
        }
        //console.log(cols)
        return <Row>
            <Col>
                <Row>
                {cols[0]}
                </Row>
            </Col>
            <Col>{cols[1]}</Col>
        </Row>
    };
    onChangeEnd = (e) => {
        this.setState({
            end_date: e.target.value,
        });
    }

    checkEndDate = (rule, value, callback) => {
        const form = this.form;
        //callback();
        //  console.log(value);
        const start_date = form.getFieldValue('start_date');
        if (start_date && value && value < start_date) {
            //console.log(callback);
            callback('End date is wrong');
        } else {
            callback();
        }
    }

    handleSubmit = (e) => {
        const form = this.form;
        e.preventDefault();
        const { getPlan } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            //console.log(err);
            if (!err) {
                this.setState({
                    loading: true
                });
                //console.log(values);
                return getPlan(values, this.props.client).then(({data}) => {

                    const upid = data.getPlan.id;
                    this.setState({
                        loading: false
                    });
                    this.props.history.push('/plan/'+upid)
                });
            } else if (err.endDate) {
                message.warning(err.endDate);
            }
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const {plan, loading, alreadyDownloaded, alreadyDownloadedId} = this.props;
        if (1==12 || loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <div>
                    <Row style={{marginBottom:24}}>
                        <Card loading>
                           aa
                        </Card>
                    </Row>

                    <Row style={{marginBottom:24}}>
                        <Card loading title="Description">

                            description
                        </Card>
                    </Row>
                    <Row>
                        <Card loading title="Plan Details">

                           details
                        </Card>
                    </Row>
                </div>
            );
        }




        //console.log(plan);
        //console.log(loading);
        var img = plan.thumb.large;
        var divStyle = {
            backgroundImage: 'url(' + img + ')'
        }



        return (
            <div>
                    <Row style={{marginBottom:24}}>
                        <Card>
                            <Row>
                            <Col xs={24} md={8} span={8}>
                                <img alt="example" src={img} style={{width:'100%'}} />
                            </Col>
                            <Col xs={24} md={14} offset={1} span={16} >
                                <div className="ap-card__body">
                                    <div className="ap-card__title ap-card__title--large">
                                        <h1>{plan.title}</h1>
                                    </div>
                                    <div className="ap-card__description">
                                        <ul>
                                            {plan.benefits.map((el, index) => {
                                                return <li key={index}>{el}</li>;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="ap-card__action">
                                        {alreadyDownloaded ? <Link to={'/plan/'+alreadyDownloadedId} ><Button icon="check" size="large" onClick={this.openModal} >Already Got It</Button></Link> :
                                        <Button type="primary"  icon="download" size="large" onClick={this.openModal} >Get It</Button>}
                                    </div>
                                </div>
                            </Col>
                            </Row>
                        </Card>
                    </Row>



                <Row style={{marginBottom:24}}>
                        <Card title="Description">

                                {plan.description}
                        </Card>
                </Row>
                <Row>
                <Card title="Plan Details">

                        {this.planDetails()}
                </Card>
                </Row>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.modalIsOpen}
                    confirmLoading={this.state.loading}
                    onCancel={this.toggle}
                    onSubmit={this.handleSubmit}
                    onChangeEnd={this.onChangeEnd}
                    checkEndDate={this.checkEndDate}
                    plan={plan}
                    end_date={this.state.end_date}
                />


            </div>)
    }
}


export default withApollo(PlanstorPlanLayout)
