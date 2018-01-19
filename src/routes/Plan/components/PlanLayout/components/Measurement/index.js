import React from 'react'
import PropTypes from 'prop-types'

import Tracker from '../../../Tracker';
import { Card, Row, Col, Progress, Popover, Icon, Tooltip, Input, TimePicker, Dropdown, Menu } from 'antd';
const { TextArea } = Input;

export default class Measurement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         //   tab:''
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {

    };

    onChange(value) {
        this.props.onChange(value, 'input');
    }

    render() {
       //console.log(this.props);
       const {item} = this.props;
       console.log(item);
       const {label, textBefore, description, units, reports, targets} = item;
       const unitsName = units.name;

        if (reports) {
            const {time, date, comments} = reports;
        } else {
            const time = '';
            const comments = '';
        }
        const reportValue = 10;


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
                      actions={[<Popover content={<TimePicker use12Hours format="h:mm a" />} title="Reported at"><Icon type="clock-circle-o" /></Popover>, <Popover content={<TextArea placeholder="" />} title="Comments"><Icon type="message" /></Popover>,  <Icon type="area-chart" style={{marginLeft:10}} />]}
        >

            <Row><Col md={12}>
                <Card.Meta description={textBefore} style={{marginBottom:10}}
                />
                <Tracker item={item} value={reportValue} onChange={this.onChange} /> {unitsName}
                <Card.Meta
                    description={description} style={{marginTop:10}} /></Col>
                <Col md={12}>
                    {targets.map((target) => (<div>
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