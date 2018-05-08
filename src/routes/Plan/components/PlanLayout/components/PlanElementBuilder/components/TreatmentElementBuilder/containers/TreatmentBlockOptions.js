import React from 'react';
import TreatmentElementBlock from './TreatmentBlockOption';
import {List} from 'antd';
import {compose, withHandlers} from 'recompose';






const TreatmentBlockOptions = ({elements, planId, itemInfo, deleteTmpElement, mode, onElementUpdate}) => {
    return <List
        style={{marginTop:3}}
        size="small"
        itemLayout="horizontal"
        dataSource={elements}
        renderItem={(option, k) => {
            // const {element={}} = option;
            // const {info:optionElement} = element;
            // prepare element for mutation
            //const optionPrepared = prepareElementForMutation(option);
            //console.log(optionPrepared);


            // //form.getFieldDecorator(`types[${k}]`, {initialValue: block.type});
            //form.getFieldDecorator(`keys[${index}]`, {initialValue: k});
            return <TreatmentElementBlock key={k} i={k} planId={planId} treatmentId={itemInfo.id} deleteTmpElement={deleteTmpElement} isBuilderMode mode={mode} option={option} onElementUpdate={onElementUpdate} />;
        }}
    />;
};

const enhance = compose(
    withHandlers({
        triggerChange: props => (changedValue) => {
            // Should provide an event to pass value to Form.
            const onChange = props.onChange;
            if (onChange) {
                onChange(Object.assign({}, this.state, changedValue));
            }
        }
    }),
    withHandlers({
        onElementUpdate: props => (changedValue) => {
            //console.log(props);
            // Should provide an event to pass value to Form.
            // const onChange = props.onChange;
            // if (onChange) {
            //     onChange(Object.assign({}, this.state, changedValue));
            // }
        }
    }),

)

export default enhance(TreatmentBlockOptions);
