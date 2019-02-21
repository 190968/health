import React from 'react';
import {Button, DatePicker as DatePickerAntd} from 'antd';
import { withToggleModal } from '../../Modal';
import { compose, withHandlers } from 'recompose';

 const DatePickerPure = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    
    return <React.Fragment>
        {showModal && <DatePickerAntd open={true} onChange={props.handleChange} {...otherProps}  />}
        <Button size={'small'} icon={'calendar'} onClick={toggleModal} />
    </React.Fragment>
}

const enhance = compose(
    withToggleModal,
    withHandlers({
        handleChange: props => (value) => {
            props.setShowModal(false);
            props.onChange(value);
        }
    })
)
export const DatePicker = enhance(DatePickerPure);