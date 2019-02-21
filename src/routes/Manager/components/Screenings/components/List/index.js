import React from 'react';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import DefaultI18nEn from '../../../../../../i18n/en';
import { FormattedMessage } from 'react-intl';
import ScreeningsManagerButton from '../Buttons/components/Manage';
import  ScreeningsTable from '../Table';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'scheduled', label: <FormattedMessage {...DefaultI18nEn.filterScheduled} /> },
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    // { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
    // { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const ScreeningList = props => {
    const {total} = props; 
    

    return <PageHeaderLayout
        title={'Screenings '+ (total > 0 ? '('+total+')' : '')}
        action={<React.Fragment>
            <CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <ScreeningsManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>
             
            </React.Fragment>}
    >
        <ScreeningsTable {...props} />
    </PageHeaderLayout>
}

export default ScreeningList;

 