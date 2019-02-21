import React from 'react'
import Select from '../Select';

const PlanSelect = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select value={value} i18n={{placeholder:"Select ActionPlan"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} {...otherProps} />;
};

export default PlanSelect;
