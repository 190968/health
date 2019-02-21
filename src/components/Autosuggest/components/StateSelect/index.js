import React from 'react'
import Select from '../Select';
import { compose,  withProps, withHandlers } from 'recompose';

const formatLabel = item => {
    const { name } = item;
    return name;
}

const StateSelect = (props) => {
    const { items = [], usePhoneCode=false, disableSelect, value = undefined, ...otherProps } = props;

    return <Select 
        {...otherProps}
        value={value}
        getFullInfo={true}
        labelInValue={true} 
        i18n={{ placeholder: "Select State" }} 
        items={items} 
        labelFormat={formatLabel}
        optionFilterProp={'name'}
        filterOption={(input, option) => {
            // console.log(option);
            // console.log(input);
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
        //valueFormat={formatValue}
        disableSelect={disableSelect}
        />;
};


const enhance = compose(
    // defaultProps({
    //     getFullInfo:true,
    //     labelInValue:true
    // }),
    withProps(props => {
        // format value
        const {  mode, items=[] } = props;
        let { value } = props;
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, name } = val || {};
                    return { key: id, label: name };
                })
                //console.log(values);
                return {value: values};
            }
            let { value } = props;
        
            //return value;
            const { id, name } = value || {};
            return { value: { key: id, label: name } };
        }
    }),
    // withHandlers({
    //     doSearch: props => value => {
    //         // let option = props.items.filter(item => item.id === value);
    //         // if (option.length > 0) {
    //         //     option = option[0];
    //         // } else {
    //         //     option = undefined;
    //         // }
    //         // props.onChange(option);
    //     }
    // })
)
// const enhance = branch(({ getFullInfo = false }) => getFullInfo,
//     fullValue
// );

export default enhance(StateSelect);