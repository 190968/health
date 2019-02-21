import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import BrahmManagerButton from '../Buttons/components/Manage';
import  BrahmsTable from '../Table';
import DefaultI18nEn from '../../../../i18n/en';
import { CardExtraItems } from '../../../Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../Card/components/CardQuickFilter';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
    { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const BrahmsList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'Brahms'+ (total > 0 ? ' ('+total+')' : '')}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <BrahmManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><BrahmsTable {...props} /></Card>
    </PageHeaderLayout>
}

export default BrahmsList;

 