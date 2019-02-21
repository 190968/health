import React from 'react';
import {Checkbox, Button, Input, Popover} from 'antd';
import { withState, compose, withHandlers } from 'recompose';
import { withToggleModal } from '../../../../../../../../components/Modal';
import ChoiceElement from '../../../../../../../../components/FormCustomFields/components/ChoiceElement';
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;

const TrackerManagerColumns = props => {
    const {columns=[], onChange, canManage=true} = props;

    const content = <div>
        <ColumnInput onChange={props.appendColumn} setShowModal={props.setShowModal}/>
    </div>
    console.log(props);
    return <React.Fragment>

    {columns.length > 0 && <ChoiceElement 
        value={props.selectedColumns}
        isMultiple
         onChange={onChange}
        options={columns.map((column, i) => {
            //console.log(column);
            return { key:i, label: column.name, value: i };
        })}
         />}
        {canManage && <div><Popover visible={props.showModal} onVisibleChange={props.setShowModal} content={content} trigger="click">
            <Button>Add Column</Button>
        </Popover></div>}
</React.Fragment>
}

export default  withToggleModal(TrackerManagerColumns);



const ColumnInputPure = props => {
    //appendColumn(name);
    return <InputGroup compact>
    <Input onChange={props.selectInput} value={props.name} placeholder={'Column  name'} style={{ width: '200px' }}  />
    <Button type={'primary'} onClick={props.onChange} >Add</Button>
    </InputGroup>
}

const enhance = compose(
    withState('name', 'setName', props => {
        return '';
    }),
    withHandlers({
        selectInput: props => (e) => {
            const { value } = e.target;
            props.setName(value);
        },
        onChange: props => () => {
            props.onChange(props.name);
            props.setShowModal(false);
            props.setName('');
        }
    })
);
const ColumnInput = enhance(ColumnInputPure);