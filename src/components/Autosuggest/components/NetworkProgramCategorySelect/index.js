import React from 'react'
import {Cascader, Select} from 'antd';
import {compose, withHandlers} from 'recompose';

const NetworkProgramCategorySelect = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    console.log(value, 'value');
    if (loading) {
        return <Select loading={true} />;
    }
    return <Cascader options={items} defaultValue={value} onChange={onChange} placeholder="Please select" />;
    // <Select value={value} i18n={{placeholder:"Select Category"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};


const enhance = compose(
    // withProps(props => {
    //     // format value
    //     // console.log(props);
    //     const { value, mode  } = props;
    //     const {id, getSubCategories=[]} = value;
    //     const {id:subId} = getSubCategories[0] || {};
    //     return {value:[id, subId]};

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
export default enhance(NetworkProgramCategorySelect);
