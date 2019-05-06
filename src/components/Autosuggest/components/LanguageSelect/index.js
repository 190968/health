import React from 'react'
import Select from '../Select';
import {compose, withProps} from 'recompose';

const LanguageSelect = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select value={value} i18n={{placeholder:"Select Language"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} {...otherProps} />;
};


const enhance = compose(
    // withProps(props => {
    //     // format value
    //     const { value, mode  } = props;
    //     if (value) {
    //         if (mode === 'multiple') {

    //             const values = value.map(val => {
    //                 const { id, name } = val || {};
    //                 return { key: id, label: name };
    //             })
    //             //console.log(values);
    //             return {value: values};
    //         }
    //         //return value;
    //         const { id, name = '' } = value || {};
    //         return { value: { key: id, label: name } };
    //     }
    // }),
)
export default enhance(LanguageSelect);
