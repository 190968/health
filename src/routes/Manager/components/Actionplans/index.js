import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input,Menu,Dropdown, Card,Table,  Button, Icon, Tooltip} from 'antd';
import TableCustom from './components/Table';



export default class ActionPlans extends React.Component {


    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }

        const plansTotal = this.props.plansTotal;
        return (
            <Card type="table" title={'ActionPlans'+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')} extra={<Tooltip title="Add New Workflow"><Link to='/pb'><Button size="small"><Icon type="plus"  /></Button></Link></Tooltip>}>
                <TableCustom plans={this.props.plans}/>

            </Card>);
    }
}