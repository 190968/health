import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import ActionplanManagerButton from '../Buttons/components/Manage';
import ActionplansTable from '../Table';
import DefaultI18nEn from '../../../../../../i18n/en';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import { GetGlobalLabel } from '../../../../../../components/App/app-context';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'draft', label: <FormattedMessage {...DefaultI18nEn.filterDraft} /> },
    { value: 'published', label: <FormattedMessage {...DefaultI18nEn.filterPublished} /> },
    { value: 'pending', label: <FormattedMessage {...DefaultI18nEn.filterPending} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const ActionplanssList = props => {
    const {total} = props;
    return <PageHeaderLayout
        title={<> <GetGlobalLabel type={'manager.actionplans'} defaultValue={'ActionPlans'} /> {(total > 0 ? ' ('+total+')' : '')}</>}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <ActionplanManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><ActionplansTable {...props} /></Card>
    </PageHeaderLayout>
}

export default ActionplanssList;

 