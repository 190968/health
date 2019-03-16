import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

// const TrackerSelectPure = ({loading, items=[], doSearch, onChange, value=undefined, getInfo=false}) => {
//     const trackers = items.map(item => {
//         const {units} = item;
//         return {id:item.id, title:<React.Fragment>{item.label} <div style={{fontSize:'0.8em',color:'grey'}}>{units.name}</div></React.Fragment>};
//     });
    
//     return <Select value={value} i18n={{placeholder:"Select Tracker"}} loading={loading} items={trackers} doSearch={doSearch} onChange={onChange} />;
// };




// const enhance = compose(
//     defaultProps({
//         selectInfo:undefined,// if to get the info
//     }),
//     withProps(props => {
//         // format value
//         const { value, mode, getSelectedInfo  } = props;
//         console.log(props, 'props');
//         if (value && getSelectedInfo) {
//             if (mode === 'multiple') {

//                 const values = value.map(val => {
//                     const { id, label } = val || {};
//                     return { key: id, label: label };
//                 })
//                 //console.log(values);
//                 return {value: values};
//             }
//             //return value;
//             const { id, label = '' } = value || {};
//             return { value: { key: id, label: label } };
//         }
//     }),
//     withHandlers({
//         onChange: props => trackerId => {
//             if (props.selectInfo || props.getSelectedInfo) {
//                 const tracker = props.items.find(tracker => tracker.id === trackerId);
//                 if (props.selectInfo && tracker) {
//                     props.selectInfo(tracker);
//                 }
//                 if (props.getSelectedInfo) {
//                     props.onChange(tracker);
//                     return true;
//                 }
//             }
//             props.onChange(trackerId);
//         }
//     })
// )

// const TrackerSelect = enhance(TrackerSelectPure);
// export default TrackerSelect


const formatTracker = item => {
    const {units} = item;
    return <React.Fragment>{item.label} <span style={{fontSize:'0.8em',color:'grey'}}>{units.name}</span></React.Fragment>;
    //         
}
const TrackerSelectPure = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    // const trackers = items.map(item => {
    //             const {units} = item;
    //             return {id:item.id, title:<React.Fragment>{item.label} <div style={{fontSize:'0.8em',color:'grey'}}>{units.name}</div></React.Fragment>};
    //         });
    return <Select value={value} labelFormat={formatTracker} i18n={{placeholder:"Select Tracker"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        const { value, mode  } = props;
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, label } = val || {};
                    return { key: id, label: label };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id, label = '' } = value || {};
            return { value: { key: id, label: label } };
        }
    }),
)
export const TrackerSelect = enhance(TrackerSelectPure);
export default TrackerSelect