import React from 'react';
import {Popover, Tooltip, Button} from 'antd';
import {compose, withState, withHandlers, withProps} from 'recompose';
import TimelineElementSelect from '../TimelineElementSelect';
import { withModal } from '../../../../../../../../../../components/Modal';


const TimelineElementSelectModal = compose(
    withProps(props => ({
        modalTitle: 'Select Element',
        modalFooter:false,
        modalWidth:700
    })),
    withModal
)(TimelineElementSelect)


const TimelineElementSelectAddPure = props => {
    const {onClick, show, handleVisibleChange, onSelect, user} = props;
     
    return <React.Fragment>
        {show && <TimelineElementSelectModal onSelect={onSelect} onHide={handleVisibleChange} user={user} /> }
        <Tooltip title="Add Element"><Button icon="plus" size={'small'}  onClick={onClick} /></Tooltip>
        </React.Fragment>;
}

const enhance = compose(
    withState('show', 'setShow', false),
    withHandlers({
        onClick:  (props) => (e) => {
            console.log(props);
            const { show, onClick } = props;

            props.setShow(!show);
           // onClick(e);
        },
        onClick:  (props) => (e) => {
            console.log(props);
            const { show, onClick } = props;

            props.setShow(!show);
            // onClick(e);
        },
        onSelect:  (props) => (e) => {
            props.setShow(false);
            props.onSelect(e);
        },
        handleVisibleChange:   (props) => (e) => {
            console.log(props);
            const {show} = props;
            props.setShow(!show);
            // onClick(e);
            // return {
            //     show: !show,
            // };
        },
    }),
    // withStateHandlers(
    //     ({ show = false }) => ({
    //         show: show,
    //     }),
    //     {
    //
    //         handleVisibleChange:   (props) => (e) => {
    //             console.log(props);
    //             // onClick(e);
    //             // return {
    //             //     show: !show,
    //             // };
    //         },
    //     }
    // )
);

export const TimelineElementSelectAdd = enhance(TimelineElementSelectAddPure);

export default TimelineElementSelectAdd;