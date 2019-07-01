import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';


const formatTitle = item => {
    return <React.Fragment>{item.name} <span style={{fontSize:'0.8em',color:'grey'}}>{item.dosage}</span></React.Fragment>;
}

const MedicationSelect = ({loading,  items=[], doSearch, onChange, value=undefined, ...otherProps}) => {
    // console.log(value);
    return <Select {...otherProps} value={value} labelFormat={formatTitle} i18n={{placeholder:"Select Medication"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        // console.log(props);
        const { value} = props;
        if (value) {
            //return value;
            const { id } = value || {};
            return { value: { key: id, label: formatTitle(value)} };
        }
    }),
    
)


// const MedicationSelect = ({loading, items=[], doSearch, onChange, value=undefined, ...otherProps}) => {
//     const medications = items.map(item => {
//         return {id:item.id, title:<React.Fragment>{item.name} <div style={{fontSize:'0.8em',color:'grey'}}>{item.dosage}</div></React.Fragment>};
//     })
//     return <Select value={value} i18n={{placeholder:"Select Medication"}} loading={loading} items={medications} doSearch={doSearch} onChange={onChange} {...otherProps} />;
// };



// const enhance = compose(
//     withProps(props => {
//         // format value
//         const { value, mode  } = props;
//         if (value) {
//             if (mode === 'multiple') {

//                 const values = value.map(val => {
//                     const { id, name } = val || {};
//                     return { key: id, label: name };
//                 })
//                 //console.log(values);
//                 return {value: values};
//             }
//             //return value;
//             const { id, name = '' } = value || {};
//             return { value: { key: id, label: name } };
//         }
//     }),
// )
// const enhance = compose(
//     defaultProps({
//         selectInfo:undefined,// if to get the info
//     }),

    
//     withHandlers({
//         onChange: props => trackerId => {
//             if (props.selectInfo) {
//                 const tracker = props.items.find(tracker => tracker.id === trackerId);
//                 if (tracker) {
//                     props.onChange(tracker);
//                     return true;
//                 }
//             }
//             props.onChange(trackerId);
//         }
//     })
// )

export default enhance(MedicationSelect);