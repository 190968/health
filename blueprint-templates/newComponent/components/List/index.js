import React from 'react';
import {Card} from 'antd';
import { FormattedMessage } from 'react-intl';
import {{pascalCase $moduleName}}ManagerButton from '../Buttons/components/Manage';
import  {{pascalCase $moduleName}}sTable from '../Table';

const filters = [
    { value: 'all', label: <FormattedMessage {...DefaultI18nEn.filterAll} /> },
    { value: 'active', label: <FormattedMessage {...DefaultI18nEn.filterActive} /> },
    { value: 'future', label: <FormattedMessage {...DefaultI18nEn.filterFuture} /> },
    { value: 'completed', label: <FormattedMessage {...DefaultI18nEn.filterCompleted} /> },
    { value: 'archived', label: <FormattedMessage {...DefaultI18nEn.filterArchived} /> }
];

const {{pascalCase $moduleName}}sList = props => {
    const {total} = props;

    return <PageHeaderLayout
        title={'{{pascalCase $moduleName}}s'+ (total > 0 ? ' ('+total+')' : '')}
        action={<CardExtraItems>
            <CardQuickFilter size={'default'} filters={filters} value={props.status || 'all'} onChange={props.loadByStatus} />
            <{{pascalCase $moduleName}}ManagerButton icon={'plus'} refetch={props.refetch} />
            </CardExtraItems>}
    >
        <Card type={'table'}><{{pascalCase $moduleName}}sTable {...props} /></Card>
    </PageHeaderLayout>
}

export default {{pascalCase $moduleName}}sList;

 