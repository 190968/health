import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import ProgramManagerButton from '../Buttons/components/Manage';
import  ProgramsTable from '../Table';
import DefaultI18nEn from '../../../../../../i18n/en';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';

const filters = [
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const ProgramsList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'Programs'+ (total > 0 ? ' ('+total+')' : '')}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'active'} onChange={props.loadByStatus} />
            <ProgramManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><ProgramsTable {...props} /></Card>
    </PageHeaderLayout>
}

export default ProgramsList;

 