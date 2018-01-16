import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import { arrayChunk, intersperse } from '../../../../utils/main';

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import { RectShape} from 'react-placeholder/lib/placeholders'

import { Card, Modal, Row, Col, Button, List, Form ,Popover, Radio, DatePicker} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const planPlaceholder = [];
    planPlaceholder.push(  {
        item:      <div style={{width: 400, height: 250 }} className='my-awesome-placeholder'>
            <RectShape color='#E0E0E0'  style={{width: 400, height: 250}}/>
        </div>
    })
    planPlaceholder.push(  {
        item:     <div>
        <ReactPlaceholder type='text' ready={false} rows={5} color='#E0E0E0'>
               </ReactPlaceholder>
            <ReactPlaceholder type='rect' ready={false} color='#888888' style={{ width: 100, height: 50 }}>
            </ReactPlaceholder>
            </div>
    })


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
        const { visible, onCancel, onSubmit, onChangeEnd, checkEndDate, form, plan, end_date } = props;
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
                                rules: [{
                                    required: true, message: 'Please Select Start Date',
                                }],
                            })(
                                <DatePicker/>
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
                                                required: true, message: 'Please Select End Date',
                                            }, {
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
            modalIsOpen: false,
            end_date:0
        };
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
                return [
                    <Col md={6}>
                        <strong>{el[0]}:</strong>
                    </Col>,
                    <Col md={6} >
                        {el[1]}
                    </Col>
                ];
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
        console.log(start_date);
        console.log(value);
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
            if (!err) {
                this.setState({
                    loading: true
                });
                //console.log(values);
                return getPlan(values, this.props.client);
            }
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const {plan, loading} = this.props;
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
                                        <Button type="primary"  icon="download" size="large" onClick={this.openModal} >Get It</Button>
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

                        {this.planDetails(plan)}
                </Card>
                </Row>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.modalIsOpen}
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


/*
 <Form
                            onSubmit={(values) => {
                                console.log('Success!', values)
                            }}
                            validate={({ name }) => {
                                return {
                                    name: !name ? 'A name is required' : undefined
                                }
                            }}
                        >
                            {({submitForm}) => {
                                return (
                                    <form onSubmit={submitForm}>
                                        <div className="box">
                                            <div className="box__header">
                                                <h3>Privacy</h3>
                                            </div>
                                            <div className="box__body">
                                                <RadioGroup field="notificationType">
                                                    <div>
                                                        <label>
                                                            <Radio value="email" />{' '}
<span>Open</span>
</label>
</div>
<div>
    <label>
        <Radio value="text" />{' '}
        <span>Private</span>
    </label>
    </div>

</RadioGroup>
</div>
</div>


<div className="box">
    <div className="box__header">
        <h3>Scheduling</h3>
    </div>
    <div className="box__body">
        <FormGroup row>
            <Label for="scheduling" sm={2}>Starts on</Label>
            <Col sm={10}>
            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="scheduling" sm={2}>Ends</Label>
            <Col sm={10}>
            <RadioGroup field="notificationType">
            <div>
            <label>
            <Radio value="haveNoEndDate" />{' '}
            <span>Never</span>
            </label>
    </div>
    <div>
        <label>
            <Radio value="haveEndDate" />{' '}
            <span>On</span>
        </label>
        </div>

    </RadioGroup>
</Col>
</FormGroup>
</div>
</div>

</form>
)
}}
</Form>
 */
