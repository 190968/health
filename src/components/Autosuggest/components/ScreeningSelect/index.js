import React from 'react'
import Select from '../Select';
import {compose, withProps} from 'recompose';

const ScreeningSelect = ({loading, screenings, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select value={value} i18n={{placeholder:"Select Screening"}} loading={loading} items={screenings} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};


const enhance = compose(
    withProps(props => {
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
export default enhance(ScreeningSelect);
