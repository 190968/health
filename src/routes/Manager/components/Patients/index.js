import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Card,Table,  Button, Icon, Tooltip} from 'antd';

export default class Patients extends React.Component {
    state = {
        // for search
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
    };

    static defaultProps = {
        plans:[],
        plansTotal:0
    }

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {
        const {loading} = this.props;
        let { sortedInfo } = this.state;
        const columns = [{
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (title, info) => {
                return <Link to={'/u/'+info.id}>{title}</Link>;
            }
        }];

        const plansTotal = this.props.total;
        const dataSource = this.props.patients;
        return (
            <Card type="table" title={'Patients'+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')} extra={<Tooltip title="Add New Workflow"><Link to='/pb'><Button size="small"><Icon type="plus"  /></Button></Link></Tooltip>}>
                <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </Card>);
    }
}