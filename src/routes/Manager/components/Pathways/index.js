import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Table, Button,  Tooltip} from 'antd';
import TableCustom from './components/Table'
export default class Pathways extends React.Component {

    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }
        const {pathways,total} = this.props;
        return (
            <Card type="table" title={'Pathways'+ (total > 0 ? ' ('+total+')' : '')} extra={<Tooltip title="Add New Pathway"><Link to='/pb/type/pathway'><Button size="small" type="primary" ghost={true} icon="plus" /></Link></Tooltip>}>
                <TableCustom pathways={pathways}/>
            </Card>);
    }
}