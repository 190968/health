import React from 'react';
import { Collapse } from 'antd';
import PlanFilterPanel from '../Filter/components/Panel';
const Panel = Collapse.Panel;

const PlanFilters = props => {
    const { filters, onSuccess, activeFilters } = props;
    const firstFilter = filters[0] || {};
    console.log();
    return <Collapse bordered={false} defaultActiveKey={[firstFilter.code]} >
    {filters.map((filter) => {
       
        return <Panel header={filter.name}  key={filter.code} >
            <PlanFilterPanel key={filter.code} onSuccess={onSuccess} activeFilters={activeFilters} filter={filter} />
            </Panel>
    })}
    </Collapse>
}

export default PlanFilters