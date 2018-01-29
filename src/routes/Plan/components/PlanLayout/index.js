import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {RadialBarChart, RadialBar, Legend} from 'recharts';

import { arrayChunk, intersperse } from '../../../../utils/main';

import PlanBody from './containers/PlanBody';
import UserPlanEdit from './containers/UserPlanEdit';
import {Icon, Avatar, Card,Row, Col, Button, Tooltip ,Popover, Dropdown, Menu, Checkbox } from 'antd';

import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';
import moment from "moment/moment";


const { Meta } = Card;





export class PlanLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoModal: false,
            openEditModal:false,
            date: props.date
        };
        this.showDate = this.showDate.bind(this);
        this.showIntro = this.showIntro.bind(this);
        this.hideIntro = this.hideIntro.bind(this);
        this.inviteMotivators = this.inviteMotivators.bind(this);
        this.showEditPlan = this.showEditPlan.bind(this);
        this.hideEditPlan = this.hideEditPlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
        this.completePlan = this.completePlan.bind(this);
    };
    static propTypes = {
        plan: PropTypes.object,

    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    };
    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.setState({date:date});
        //this.props.loadDate(date, this.props.user_id);
    };
    hideIntro = () => {
        this.setState({infoModal:false});
    };
    showIntro = (content) => {
        this.setState({infoModal:true});
        /**/
    };
    showEditPlan () {
        this.setState({openEditModal:true});
    };
    hideEditPlan () {
        this.setState({openEditModal:false});
    };
    deletePlan = () => {
        // delete plan here
        this.props.deletePlan(this.props.info.id);
    };
    completePlan = () => {
        // delete plan here
        //this.props.completePlan();
        this.props.completePlan();
    };
    inviteMotivators = () => {

    };

    render() {
        const {info, plan, user, loading} = this.props;
        if (loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <Card loading>
                    aaa
                </Card>
            );
        }
        //console.log(plan);
        //console.log(loading);
        var img = plan.thumb.wide;
        var divStyle = {
            backgroundImage: 'url(' + img + ')'
        }
        //console.log('Loading plan layout');
        const options = (
            <Menu>
                <Menu.Item key="motivators">
                    <a onClick={this.inviteMotivators}>Motivators</a>
                </Menu.Item>
                <Menu.SubMenu title="Actions">
                    <Menu.Item key="edit">
                        <a onClick={this.showEditPlan}>Edit</a>
                    </Menu.Item>
                    <Menu.Item key="delete">
                        <a onClick={this.deletePlan}>Delete</a>
                    </Menu.Item>
                    <Menu.Item key="complete">
                        <a onClick={this.completePlan}>Complete</a>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="reminders" disabled>
                    <a >Reminders</a>
                </Menu.Item>
                <Menu.Item key="print" disabled>
                    <a >Print</a>
                </Menu.Item>
                <Menu.Item key="export" disabled>
                    <a >Export</a>
                </Menu.Item>
            </Menu>
        );


        const data = [
            {name: 'Lessons', progress: 100, pv: 2400, fill: '#8884d8'},
            {name: 'Today Activities', progress: 15, pv: 4567, fill: '#83a6ed'},
            {name: 'Weekly Adherence', progress: 86, pv: 1398, fill: '#8dd1e1'},
        ];

        const style = {
            top: 0,
            left: 200,
            lineHeight: '24px'
        };

        return (
            <div>
                <Card
                    title={plan.title}
                    /*cover={<img alt={plan.title} height={300} src={img} />}*/
                    actions={[<div><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}> <Icon type="left" onClick={() => this.showDate('prev')} style={{marginRight:10}} /></Tooltip><FormattedDate
                        value={new Date(this.state.date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    /><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Icon type="right"  onClick={() => this.showDate('next')} style={{marginLeft:10}} /></Tooltip></div>, <Icon type="info-circle-o"  onClick={this.showIntro} />,  <Dropdown overlay={options} trigger={['click']}>
                        <Icon type="ellipsis" />
                    </Dropdown>,
                        <Popover content={<div>Messages here</div>} title="Comments" trigger="click"><Icon type="message" /></Popover>]}
                >
                    <Row>
                        <Col md={16}>
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={user.firstName + ' '+ user.lastName}
                        description={<FormattedMessage id="userplan.joined" defaultMessage="From {date}" values={{
                            date: <FormattedDate
                                value={new Date(info.joinDate)}
                                year='numeric'
                                month='long'
                                day='2-digit'
                            />
                        }} description="date for Today" />}
                    />
                        </Col>
<Col md={8}>
    {/*<RadialBarChart width={400} height={250} innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
        <RadialBar minAngle={15} label={{ fill: '#fff', position: 'insideStart' }} background clockWise={true} dataKey='progress' />
        <Tooltip />
    </RadialBarChart>*/}
</Col>
                    </Row>

                    {this.state.openEditModal &&
                    <UserPlanEdit id={info.id} info={info} plan={plan}
                                    title='Edit Settings' onCancel={this.hideEditPlan}  />}

                </Card>
            <Card>
                <div className="box">
                    <div className="box__body">
                        <Row>
                            <Col xs={12} sm={4} md={4}>
                                <div className="ap-card__img ap-card__img--large" style={divStyle}></div>
                            </Col>
                            <Col xs={12} sm={8} md={8}>
                                <div className="ap-card__body">
                                    <div className="ap-card__title ap-card__title--large">
                                        <h1></h1>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <PlanBody upid={info.id} id={plan.id} userId={user.id} date={this.state.date} showIntro={this.state.infoModal} hideIntro={this.hideIntro}></PlanBody>
            </Card>
            </div>)
    }
}



export default PlanLayout
