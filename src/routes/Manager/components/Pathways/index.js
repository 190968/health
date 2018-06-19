import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Table, Button, Radio, Tooltip} from 'antd';
import TableCustom from './components/Table'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Pathways extends React.Component {

    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }
        const {pathways,total} = this.props;
        const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Pathway"><Link to='/pb/type/pathway'><Button size="small" type="primary" ghost={true} icon="plus" /></Link></Tooltip>
              
    </React.Fragment>;

        return (
            <PageHeaderLayout title={'Pathwaus Boards '+ (total > 0 ? ' ('+total+')' : '')}
                          content="You can view and manage tumor boards here"
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >

            <Card type="table">
                <TableCustom pathways={pathways}/>
            </Card>
            </PageHeaderLayout>);
    }
}