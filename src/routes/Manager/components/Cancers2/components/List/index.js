import React from 'react';
import {Card} from 'antd';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import CancersTable from '../Table';
import CancerManagerButton from '../../../Cancers2/components/Buttons/components/Manage';

// const filters = [
//     { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
//     { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
//     { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
//     { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
//     { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
// ];

const CancersList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'Cancers'+ (total > 0 ? ' ('+total+')' : '')}
        action={ <CancerManagerButton icon={'plus'} refetch={props.refetch} />}
    >
        <Card type={'table'}><CancersTable {...props} /></Card>
    </PageHeaderLayout>
}

export default CancersList;

 