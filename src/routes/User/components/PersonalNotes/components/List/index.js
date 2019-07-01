import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import PersonalNoteManagerButton from '../Buttons/components/Manage';
import  PersonalNotesTable from '../Table';
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

const PersonalNotesList = props => {
    const {total, asCard} = props;

    const title = 'Personal Notes'+ (total > 0 ? ' ('+total+')' : '');
   
    if (asCard) {
        return <Card title={title} extra={<PersonalNoteManagerButton icon={'plus'} size={'small'} type={'default'} refetch={props.refetch} />} type={'table'}><PersonalNotesTable {...props} /></Card>
    }
    return <PageHeaderLayout
        title={title}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <PersonalNoteManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><PersonalNotesTable {...props} /></Card>
    </PageHeaderLayout>
}

export default PersonalNotesList;

 