import React from 'react'
import Select from '../Select';
import {compose, withHandlers, branch, withProps} from 'recompose';

const ChemotherapySelect = ({loading, items, doSearch, onChange, value=undefined, mode=null}) => {
    return <Select value={value} getFullInfo i18n={{placeholder:"Select Chemotherapy"}} loading={loading} mode={mode} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        const { value, mode  } = props;
        // console.log(props);
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, title } = val || {};
                    return { key: id, label: title };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id, title = '' } = value || {};
            return { value: { key: id, label: title } };
        }
    }),
)

export default enhance(ChemotherapySelect);