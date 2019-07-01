import React from 'react'
import {compose, withProps} from 'recompose';
import Select from '../Select';

const ProviderSelect = ({loading, items, doSearch, onChange, value=undefined, getFullInfo=true, ...otherProps}) => {
    return <Select {...otherProps} value={value} getFullInfo={getFullInfo} i18n={{placeholder:"Select Provider"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        const { value, mode, getFullInfo  } = props;
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
// const enhance = compose(
//     // withHandlers({
//     //     onChange: props => value => {
//     //         let option = props.items.filter(item => item.id === value);
//     //         if(option.length > 0) {
//     //             option = option[0];
//     //         }
//     //         props.onChange(value, option);
//     //     }
//     // })
// );

export default enhance(ProviderSelect);