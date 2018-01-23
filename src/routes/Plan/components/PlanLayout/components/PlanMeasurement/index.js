import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Tracker from '../../../Tracker';
import { Card, Row, Col, Progress, Popover, Icon, Tooltip, Input, TimePicker, Dropdown, Menu } from 'antd';
const { TextArea } = Input;

export default class PlanMeasurement extends React.PureComponent {
    constructor(props) {
        super(props);
        const {item} = this.props;
        const {reports} = item;
        let value = null;
        let time = null;
        let comments = '';
        if (reports && reports.length > 0) {
            const report = reports[0];
            time = report.time;
            comments = report.comments;
            value = report.value;

        }
        this.state = {
            value:value,
            time:time,
            comment:comments
        };
        //this.onChange = this.onChange.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.handleComments = this.handleComments.bind(this);
        this.onReport = this.onReport.bind(this);
    };
    static propTypes = {

    };


    handleComments(e) {
        const value = e.target.value;
        this.setState({comments: value});

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {this.triggerChange()}.bind(this), 500);
    }
    changeTime(value) {
        const time = value && value.format("hh:mm:ss")
        this.setState({time: time});

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {this.triggerChange()}.bind(this), 500);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //console.log(this.props);
        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    changeComment(value) {
        //console.log(value);
        this.setState({comments:value});
        this.onReport();
    }


    handleChange = (value) => {
        clearTimeout(this.timer);

        this.setState({ value });

        this.timer = setTimeout(function () {this.triggerChange()}.bind(this), 500);


    }

    triggerChange() {
        this.onReport();
    }

    onReport() {
        if (this.state.value) {
            this.props.onChange(this.state.value, this.state.time, this.state.comments);
        } else {
            alert('Enter');
        }
    }

    render() {
       //console.log(this.props);
       const {item, date} = this.props;
       const {label, textBefore, description, units, reports, targets} = item;
       const unitsName = units.name;
        //console.log(this.props);
        //console.log(typeof reports);
       // let comments = '';
        let isCritical  = false;

        if (reports && reports.length > 0) {
            const report =  reports[0];
            //time = report.time;
            isCritical = report.isCritical;
        }

        const{time, comments, value} = this.state;

        //console.log(time);
        //console.log(value);

        /*const columns = [{
            title: 'Report Tracker',
            dataIndex: 'tracker',
            key: 'tracker',
        }, {
            title: 'Reported at',
            dataIndex: 'time',
            key: 'time',
        }
        ];

        const data = [{
            key: '1',
            tracker: ,
            time: <TimePicker use12Hours format="h:mm a" />
        }];*/
/*
<Row>
            <Col xs={12}><Tracker /></Col>
            <Col xs={12}><TimePicker use12Hours format="h:mm a" /></Col>
        </Row>
 */
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a>Edit Reminders</a>
                </Menu.Item>
            </Menu>
        );
        return (<Card hoverable title={label}
                      extra={<Dropdown overlay={menu} trigger={['click']}><Tooltip title="Tracker Settings"><Icon type="ellipsis" /></Tooltip></Dropdown>}
                      actions={[<Popover content={<TimePicker use12Hours value={time && moment(date+' '+time)} onChange={this.changeTime} format="h:mm a" />} title="Reported at"><Icon type="clock-circle-o" /></Popover>, <Popover content={<TextArea placeholder="" value={comments} onChange={this.handleComments}  />} title="Comments"><Icon type="message" /></Popover>,  <Icon type="area-chart" style={{marginLeft:10}} />]}
        >

            <Row><Col md={12}>
                <Card.Meta description={textBefore} style={{marginBottom:10}} />
                <Tracker item={item} value={value} onChange={this.handleChange} /> {unitsName}
                <Card.Meta
                    description={description} style={{marginTop:10}} /></Col>
                <Col md={12}>
                    {targets.map((target) => (<div key={target.id}>
                        <div>{target.title}</div>
                        <Progress percent={target.value} />
                    </div>))}
                    </Col></Row>


        </Card>)
        /*return (<Card hoverable
        ><Tracker />
            <Popover content={<TimePicker use12Hours format="h:mm a" />} mouseEnterDelay={1} title="Time"><Icon type="clock-circle-o"  style={{marginLeft:10, marginRight:10}} /></Popover> <Popover content={<TextArea placeholder="" />} mouseEnterDelay={1} style={{marginLeft:10}} title="Comments"><Icon type="message" /></Popover>
            <Icon type="area-chart" style={{marginLeft:10}} />
        </Card>)*/
        //return (<Card  hoverable><Table columns={columns} dataSource={data} /></Card>)
    }
}