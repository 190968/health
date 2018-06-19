import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input,Menu,Dropdown,Radio, Card,Table,  Button, Icon, Tooltip} from 'antd';
import TableCustom from './components/Table';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class ActionPlans extends React.Component {


    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }

        const plansTotal = this.props.plansTotal;
        const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New ActionPlan"><Link to='/pb'><Button size="small"><Icon type="plus"  /></Button></Link></Tooltip>
    </React.Fragment>;

        return (
            <PageHeaderLayout title={'ActionPlans Boards '+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')}
                          content="You can view and manage tumor boards here"
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >

            <Card type="table">
                <TableCustom plans={this.props.plans}/>

            </Card>
            </PageHeaderLayout>);
    }
}