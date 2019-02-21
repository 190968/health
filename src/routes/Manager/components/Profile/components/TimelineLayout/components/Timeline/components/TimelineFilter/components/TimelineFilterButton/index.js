import React from 'react';
import {Button, Tooltip} from 'antd';
import TimelineFilter from '../../../../containers/TimelineFilter';
import { withToggleModal } from '../../../../../../../../../../../../components/Modal';
const TimelineFilterButtonPure = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <TimelineFilter {...otherProps} asModal onHide={toggleModal} />}
        <Tooltip title={"Filter"} ><Button size={'small'} icon={'filter'} onClick={toggleModal} /></Tooltip>
    </React.Fragment>
}



export const TimelineFilterButton = withToggleModal(TimelineFilterButtonPure);
export default TimelineFilterButton;