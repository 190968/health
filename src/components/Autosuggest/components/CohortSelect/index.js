import React from 'react'
import Select from '../Select';
import {compose, withProps} from 'recompose';

const CohortSelect = ({loading, cohorts, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select value={value} i18n={{placeholder:"Select Cohort"}} loading={loading} items={cohorts} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};


const enhance = compose(
    withProps(props => {
        // console.log(props);
        // format value
        const { value, mode  } = props;
        if (value) {
            //return value;
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, title:name } = val || {};
                    return { key: id, label: name };
                })
                //console.log(values);
                return {value: values};
            }

            const { id, title = '' } = value || {};
            return { value: { key: id, label: title } };
        }
    }),
)
export default enhance(CohortSelect);
