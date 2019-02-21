import React from 'react'
import Select from '../Select';
import { compose, withProps } from 'recompose';

const formatTitle = item => {
    return <React.Fragment>{item.hcpc} <div style={{fontSize:'0.8em',color:'grey'}}>{item.name}</div></React.Fragment>;
}

const ProceduresSelectPure = ({loading, items=[], doSearch, onChange, value=undefined, codeAsId=false, ...otherProps}) => {
  
    return <Select {...otherProps} value={value} labelInValue labelFormat={formatTitle} i18n={{placeholder:"Select Procedure"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} />;
};

const enhance = compose(
    withProps(props => {
        // format value
        const { value = {} } = props;
        //return value;
        const { id, hcpc = '' } = value || {};
        return { value: { key: id, label: hcpc } };
    }),
)
export default enhance(ProceduresSelectPure);