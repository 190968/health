import React from 'react'
import Select from '../Select';

import {compose, withProps} from 'recompose';

const PathwaySelect = ({loading, items, doSearch, onChange, value=undefined, excludePlans=[], ...otherProps}) => {

    let plans = excludePlans && excludePlans.lenght > 0 ? items.filter(o => !excludePlans.find(o2 => o.id === o2.id)) : items;
    
    return <Select value={value} i18n={{placeholder:"Select Pathway"}} loading={loading} items={plans} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};



const enhance = compose(
    withProps(props => {
        // format value
        const { value, mode  } = props;
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, name } = val || {};
                    return { key: id, label: name };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id, name = '' } = value || {};
            return { value: { key: id, label: name } };
        }
    })
)
export default enhance(PathwaySelect);