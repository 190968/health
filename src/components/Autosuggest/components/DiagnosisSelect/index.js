import React from 'react'
import Select from '../Select';
import {compose, withProps} from 'recompose';
const formatTitle = item => {
    return <React.Fragment>{item.code} <span style={{fontSize:'0.8em',color:'grey'}}>{item.name}</span></React.Fragment>;
}

const DiagnosisSelectPure = ({loading, getFullInfo=true, items=[], doSearch, onChange, value=undefined, codeAsId=false, ...otherProps}) => {
    return <Select {...otherProps} getFullInfo={getFullInfo} value={value} labelFormat={formatTitle} i18n={{placeholder:"Select Diagnosis"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};


const enhance = compose(
    withProps(props => {
        // format value
        // const { value, codeAsId=false } = props;
        // if (value && !codeAsId) {
        //     //return value;
        //     const { id, code, name } = value || {};
        //     return { value: { key: id, label: code+' '+name } };
        // }



        const { value, mode, codeAsId=false  } = props;
        if (value && !codeAsId) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, code, name } = val || {};
                    return { key: id, label: code+' '+name };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id, code, name} = value || {};
            return { value: { key: id, label: code+' '+name } };
        }

    }),
    
)

export default enhance(DiagnosisSelectPure);