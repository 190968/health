import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import ChemotherapyManagerButton from '../Buttons/components/Manage';
import  ChemotherapysTable from '../Table';
import DefaultI18nEn from '../../../../../../i18n/en';
import { CardQuickFilter } from '../../../../../../components/Card/components/CardQuickFilter';
import { CardExtraItems } from '../../../../../../components/Card/components/CardExtraSplit';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    // { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    // { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
    // { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
    // { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const ChemotherapysList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'Chemotherapies '+ (total > 0 ? ' ('+total+')' : '')}
        // action={<CardExtraItems>
        //     {/* <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} /> */}
        //     <ChemotherapyManagerButton icon={'plus'} refetch={props.refetch} />
        //     </CardExtraItems>}
            action={<ChemotherapyManagerButton icon={'plus'} refetch={props.refetch} />}
    >
        <Card type={'table'}><ChemotherapysTable {...props} /></Card>
    </PageHeaderLayout>
}

export default ChemotherapysList;

 