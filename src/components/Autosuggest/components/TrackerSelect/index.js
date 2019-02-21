import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const TrackerSelectPure = ({loading, items=[], doSearch, onChange, value=undefined, getInfo=false}) => {
    const trackers = items.map(item => {
        const {units} = item;
        return {id:item.id, title:<React.Fragment>{item.label} <div style={{fontSize:'0.8em',color:'grey'}}>{units.name}</div></React.Fragment>};
    });
    
    return <Select value={value} i18n={{placeholder:"Select Tracker"}} loading={loading} items={trackers} doSearch={doSearch} onChange={onChange} />;
};




const enhance = compose(
    defaultProps({
        selectInfo:undefined,// if to get the info
    }),
    withHandlers({
        onChange: props => trackerId => {
            if (props.selectInfo || props.getSelectedInfo) {
                const tracker = props.items.find(tracker => tracker.id === trackerId);
                if (props.selectInfo && tracker) {
                    props.selectInfo(tracker);
                }
                if (props.getSelectedInfo) {
                    props.onChange(tracker);
                    return true;
                }
            }
            props.onChange(trackerId);
        }
    })
)

const TrackerSelect = enhance(TrackerSelectPure);
export default TrackerSelect