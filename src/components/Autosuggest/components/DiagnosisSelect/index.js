import React from 'react'
import Select from '../Select';
import {compose, withProps} from 'recompose';
const formatTitle = item => {
    return <React.Fragment>{item.code} <div style={{fontSize:'0.8em',color:'grey'}}>{item.name}</div></React.Fragment>;
}

const DiagnosisSelectPure = ({loading, items=[], doSearch, onChange, value=undefined, codeAsId=false, ...otherProps}) => {
    console.log(value);
    return <Select {...otherProps} getFullInfo value={value} labelFormat={formatTitle} i18n={{placeholder:"Select Diagnosis"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        const { value } = props;
        if (value) {
            //return value;
            const { id, code, name } = value || {};
            return { value: { key: id, label: code+' '+name } };
        }
    }),
    
)

export default enhance(DiagnosisSelectPure);