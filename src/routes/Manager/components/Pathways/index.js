import { Button, Card, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { CardQuickFilter } from '../../../../components/Card/components/CardQuickFilter';
import { PageHeaderLayout } from "../../../../components/Layout/PageHeaderLayout/index";
import DefaultI18nEn from '../../../../i18n/en';
import Table from './components/Table';
import { CardExtraItems } from '../../../../components/Card/components/CardExtraSplit';
import { PathwayManagerButton } from './components/Buttons/components/Manager';

const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];
 
const Pathways = props => {
        const {total} = props;
        return (
            <PageHeaderLayout title={'Pathways ' + (total > 0 ? ' (' + total + ')' : '')}
                              action={<CardExtraItems>
                                <CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
                                {/* <Tooltip title="Add New Pathway"> */}
                                <PathwayManagerButton  />
                                {/* <Link to=''><Button type="primary" icon={'plus'} /></Link></Tooltip> */}
                                </CardExtraItems>}
            >

                <Card type="table">
                    <Table {...props} />
                </Card>
            </PageHeaderLayout>);
}

export default Pathways;