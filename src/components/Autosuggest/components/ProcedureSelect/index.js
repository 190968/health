import React from 'react'
import Select from '../Select';
import { compose, withProps } from 'recompose';

export const formatProcedureTitle = item => {
    const {hcpc, name} = item || {};
    return <React.Fragment key={'proced_title'}>{hcpc} <span style={{fontSize:'0.8em',color:'grey'}}>{name}</span></React.Fragment>;
}

const ProceduresSelectPure = ({loading, items=[], doSearch, onChange, getFullInfo=true, value=undefined, codeAsId=false, ...otherProps}) => {
  
    return <Select {...otherProps} value={value} getFullInfo={getFullInfo} labelFormat={formatProcedureTitle} i18n={{placeholder:"Select Procedure"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};

const enhance = compose(
    // withProps(props => {
    //     // format value
    //     const { value = {} } = props;
    //     //return value;
    //     const { id } = value || {};
    //     return { value: { key: id, label: formatTitle(value) } };
    // }),
    withProps(props => {
        // format value
        const { value, mode, getFullInfo  } = props;
        // console.log(props);
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id  } = val || {};
                    return { key: id, label: formatProcedureTitle(value) };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id } = value || {};
            return { value: { key: id, label: formatProcedureTitle(value) } };
        }
    }),
)
export default enhance(ProceduresSelectPure);