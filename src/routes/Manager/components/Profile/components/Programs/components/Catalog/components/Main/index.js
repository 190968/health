import React from 'react';
import { TableWithMessage } from '../../../../../../../../../../components/Tables';
import { Tag, Rate } from 'antd';
import ProgramsViewButton from '../../../Buttons/components/View';


const ProgramsCatalogMain = props => {
    const {programs=[], patient, loading} = props;


const columns = [{
    title: 'Program',
    key: 'name',
    render: (info) => <ProgramsViewButton program={info} patient={patient} />
  }, {
    title: 'Category',
    width:200,
    dataIndex: 'categories',
    key: 'category',
    render: (categories) => {
        return  categories.map(category => <Tag key={category.id} color="blue">{category.name}</Tag>)
    },
}, {
    title: 'Distance',
    dataIndex: 'distance',
    key: 'distance',
  },
  {
    title: 'Referrals',
    dataIndex: 'referrals',
    key: 'referrals',
  },
  {
    title: 'Type',
    dataIndex: 'typeText',
    key: 'type',
  }, {
    title: 'Reviews',
    dataIndex: 'reviews',
    key: 'reviews',
    render: info => <Rate disabled />
  }];

    return <TableWithMessage 
        emptyMessage={'No Programs'}
        loading={loading}
        dataSource={programs} columns={columns}
    />
}

export default ProgramsCatalogMain;