import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Button, Icon, Tooltip} from 'antd';
import TableCustom from './components/Tables'

export default class Patients extends React.Component {

    render() {
        const {loading} = this.props;

        if (loading) {
            return <div>Loading...</div>
        }

        const plansTotal = this.props.total;
        return (
            <Card type="table" title={'Patients'+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')} extra={<Tooltip title="Add New Workflow"><Link to='/pb'><Button size="small"><Icon type="plus"  /></Button></Link></Tooltip>}>
                <TableCustom patients={this.props.patients}/>
            </Card>);
    }
}