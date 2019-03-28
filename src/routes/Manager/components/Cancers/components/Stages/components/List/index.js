import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import CancerStageManagerButton from '../Buttons/components/Manage';
import  CancerStagesTable from '../Table';
import { PageHeaderLayout } from '../../../../../../../../components/Layout/PageHeaderLayout';

// const filters = [
//     { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
//     { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
//     { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
//     { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
//     { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
// ];

const CancerStagesList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'Cancer Stages'+ (total > 0 ? ' ('+total+')' : '')}
        action={<CancerStageManagerButton icon={'plus'} refetch={props.refetch} />}
    >
        <Card type={'table'}><CancerStagesTable {...props} /></Card>
    </PageHeaderLayout>
}

export default CancerStagesList;

 