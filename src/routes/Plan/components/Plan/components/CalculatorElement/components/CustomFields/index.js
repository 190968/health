import React, { useState } from 'react';
import {Table, Input} from 'antd';


const CalculatorElementCustomFieldInput = props => {
    const {onChange, field} = props;
    const onFieldChange = e => {
        const value = e.target.value;
        props.onChange(value, field);
    }

    return <Input style={{width:100}} onChange={onFieldChange} />
}

const CalculatorElementCustomFields = props => {
    const {fields} = props;
    console.log(props);
    const [fieldValues, setFieldsValues] = useState([]);
     const onFieldChange = (value, field) => {
        const {id} = field;
        const fieldValue = {id, value};
        let fieldValuesFinal = fieldValues;
        // find the one
        const foundIndex = fieldValues.findIndex(item=>item.id === id);
        if (foundIndex >= 0) {
            fieldValuesFinal[foundIndex] = fieldValue;
        } else {
            fieldValuesFinal = [...fieldValues, fieldValue];
        }
        setFieldsValues(fieldValuesFinal);

        if (props.onChange) {
            props.onChange(fieldValuesFinal);
        }
        // if (id) {
        //     // console.log(1);
        //     // find answer
        //     const itemExisted = newEquipments.find(a => a.id ===id);
        //     const itemIndex = newEquipments.findIndex(a => a.id ===id);
        //     newEquipments[itemIndex] = {...itemExisted, ...equipment};
        // } else if (index >= 0) {
        //     newEquipments[index] = equipment;
        // } else {
        //     newEquipments = [...newEquipments, equipment];
        // }





        // console.log(value);
        // console.log(props);
        // console.log(fieldValue);

       
     }
     console.log(fieldValues);
     const columns = [
        {
          title: 'Name',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'Field',
          key: 'field',
          render: (info) => <CalculatorElementCustomFieldInput field={info} onChange={onFieldChange} />
        },
      ];

    return <Table size={'small'} dataSource={fields} columns={columns} showHeader={false} bordered pagination={false} />
            
}

export default CalculatorElementCustomFields;