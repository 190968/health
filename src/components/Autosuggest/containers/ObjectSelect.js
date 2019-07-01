import ObjectSelectPure from '../components/ObjectSelect';
 import {compose, withState, withProps, withHandlers, defaultProps} from 'recompose';

const formatTitleDefault = item => {
    return item.label;
}
const enhance = compose(
   
    withState('value', 'setValue', props => props.value),
    defaultProps({
        labelInValue:true,
        getFullInfo:true,
    }),
    // withProps(props => {
    //     // format value
    //     const { value = {} } = props;
    //     //return value;
    //     const { id } = value || {};
    //     return { value: { key: id, label: formatTitle(value) } };
    // }),
    withProps(props => {
        // format value
        const { items, labelInValue, mode, formatTitle=formatTitleDefault  } = props;
        let {value} = props;
        // console.log(props);
        if (value) {
            
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { key } = val || {};
                    return { key, label: formatTitle(value) };
                })
                //console.log(values);
                return {value: values, labelFormat:formatTitle};
            } else {
                if (!labelInValue) {
                    const value = items.find(i => i.key === value.key);
                } 
            }
            //return value;
            const { key } = value || {};
            return { value: { key, label: formatTitle(value) }, labelFormat:formatTitle };
        } else {
            return {labelFormat:formatTitle};
        }
    }),
    withHandlers({
        onChange: props => (v) => {
            // console.log(v);
            // console.log(props);
            const {key} = v || {};
            const {items, onChange, getFullInfo} = props;
            if (getFullInfo) {
                const value = items.find(item => item.key === key);
                // console.log(value);
                if (onChange) {
                    onChange(value);
                }
                props.setValue(value);
            } else {
                if (onChange) {
                    onChange(v);
                }
                props.setValue(v);
            }
        }
    })
)

export const ObjectSelect = enhance(ObjectSelectPure);