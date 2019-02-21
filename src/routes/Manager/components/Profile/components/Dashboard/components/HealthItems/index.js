import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import { HealthManagerButton } from '../../../../../../../Health/components/HealthManager/components/Button';
import { HealthViewButton } from '../../../../../../../Health/components/View/components/Button';
import { EmptyList } from '../../../../../../../../components/Loading';
const getTitleByType = type => {

    let title = 'Title';
   // console.log(type);
    switch(type) {
        case 'diagnosis':
            title = 'Diagnosis';
            break;
        case 'treatment':
            title = 'Treatment';
            break;
        case 'medication':
            title = 'Medication';
            break;
        case 'allergy':
            title = 'Allergy';
            break;
        case 'med_allergy':
            title = 'Medication Allergy';
            break;
    }
    return title;

}
export const HealthItemsTable = props => {

    const {items=[], total=0, loading=false, title="", type, user} = props;

    const colTitle = getTitleByType(type);
    const columns = [{
        title: colTitle,
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <HealthViewButton healthRecord={info} user={user} refetch={props.refetch} label={<Truncate  lines={1} >{title || 'Untitled'}</Truncate>} asText />
            //return <HealthManagerButton healthRecord={info} user={user} label={<Truncate  lines={1} >{title}</Truncate>} asText />
        },
    },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'createdDate',
            width:100,
            render: (date) => {
                return date ? moment(date).format('L') : null
            },
        }

    ];
    const dataSource = items.map((items, i) => {
        return {...items, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="table" loading={loading} extra={<HealthManagerButton user={user} type={type} onHide={props.refetch} /> /*type == 'diagnosis' && <DiagnosisManagerButton user={user} />*/}  title={title+' '+ (total > 0 ? ' ('+total+')' : '')} >
        {dataSource.length > 0 ? <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} /> : <EmptyList>No {title}</EmptyList>}
    </Card>)
}

export default HealthItemsTable;