import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import CampaignManagerButton from '../Buttons/components/Manage';
import  CampaignsTable from '../Table';
import DefaultI18nEn from '../../../../../../i18n/en';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
    { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const CampaignsList = props => {
    const {total} = props;
    return <PageHeaderLayout
        title={'Campaigns'+ (total > 0 ? '('+total+')' : '')}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <CampaignManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><CampaignsTable {...props} /></Card>
    </PageHeaderLayout>
}

export default CampaignsList;

 