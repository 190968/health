import React from 'react';
import {Button} from 'antd';
import { withToggleModal } from '../../../../../../components/Modal';
import { PlanTeamManager } from '../../containers/Manager';

const PlanTeamManagerButtonPure = props => {
    const {showModal, toggleModal, asText=false, label, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <PlanTeamManager {...otherProps} asModal onHide={toggleModal} />}
        <div onClick={toggleModal} >Team</div>
    </React.Fragment>
}

export const PlanTeamManagerButton = withToggleModal(PlanTeamManagerButtonPure);
export default PlanTeamManagerButton;