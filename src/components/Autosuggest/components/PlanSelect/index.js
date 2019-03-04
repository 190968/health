import React from 'react'
import Select from '../Select';

const PlanSelect = ({loading, items, doSearch, onChange, value=undefined, excludePlans=[], ...otherProps}) => {

    let plans = excludePlans && excludePlans.lenght > 0 ? items.filter(o => !excludePlans.find(o2 => o.id === o2.id)) : items;
    
    return <Select value={value} i18n={{placeholder:"Select ActionPlan"}} loading={loading} items={plans} doSearch={doSearch} onChange={onChange} {...otherProps} />;
};

export default PlanSelect;
