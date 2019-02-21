import React from 'react'
import Select from '../Select';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const MedicationSelect = ({loading, items=[], doSearch, onChange, value=undefined, getInfo=false}) => {
    const medications = items.map(item => {
        return {id:item.id, title:<React.Fragment>{item.name} <div style={{fontSize:'0.8em',color:'grey'}}>{item.dosage}</div></React.Fragment>};
    })
    return <Select value={value} i18n={{placeholder:"Select Medication"}} loading={loading} items={medications} doSearch={doSearch} onChange={onChange} />;
};




const enhance = compose(
    defaultProps({
        selectInfo:undefined,// if to get the info
    }),
    withHandlers({
        onChange: props => trackerId => {
            if (props.selectInfo) {
                const tracker = props.items.find(tracker => tracker.id === trackerId);
                if (tracker) {
                    props.onChange(tracker);
                    return true;
                }
            }
            props.onChange(trackerId);
        }
    })
)

export default enhance(MedicationSelect);