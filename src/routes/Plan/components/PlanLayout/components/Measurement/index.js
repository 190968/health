import React from 'react'
import PropTypes from 'prop-types'

import Tracker from '../../../Tracker';
import { Card, Table, Button, Popover, Icon, Tooltip, Input, TimePicker } from 'antd';
const { TextArea } = Input;

export default class Measurement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         //   tab:''
        };
        //this.onChange = this.onChange.bind(this);
    };
    static propTypes = {

    };

    onChange(value) {
        console.log(value);
    }

    render() {
       console.log(this.props);
       const {item} = this.props;
       const {label} = item;


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
        return (<Card hoverable title={label}
                      actions={[<Popover content={<TimePicker use12Hours format="h:mm a" />} title="Reported at"><Icon type="clock-circle-o" /></Popover>, <Popover content={<TextArea placeholder="" />} title="Comments"><Icon type="message" /></Popover>,  <Icon type="area-chart" style={{marginLeft:10}} />]}
        ><Tracker item={item} />
        </Card>)
        /*return (<Card hoverable
        ><Tracker />
            <Popover content={<TimePicker use12Hours format="h:mm a" />} mouseEnterDelay={1} title="Time"><Icon type="clock-circle-o"  style={{marginLeft:10, marginRight:10}} /></Popover> <Popover content={<TextArea placeholder="" />} mouseEnterDelay={1} style={{marginLeft:10}} title="Comments"><Icon type="message" /></Popover>
            <Icon type="area-chart" style={{marginLeft:10}} />
        </Card>)*/
        //return (<Card  hoverable><Table columns={columns} dataSource={data} /></Card>)
    }
}