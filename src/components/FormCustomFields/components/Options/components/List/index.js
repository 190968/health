
import React from 'react';
import {Button} from 'antd'
import OptionItem from './option';
const OptionsList = (props) => {
    const {options=[], form, remove, minOptions} = props;
     console.log(options);
    return <>
        {options.length > 0 && <ul style={{listStyle: 'none',
            marginLeft: 0,
            paddingLeft: 0}}
        >
            {options.map((k, index) => (
                <OptionItem key={`item-${index}`} index={index} i={index} form={form} option={k} options={options} remove={props.deleteOption} updateOption={props.updateOption} minOptions={minOptions} />
            ))}
        </ul>}
        <Button icon={'plus'} type="dashed" onClick={props.add} style={{width: '60%'}}> Add </Button>
    </>;
}

export default OptionsList;
