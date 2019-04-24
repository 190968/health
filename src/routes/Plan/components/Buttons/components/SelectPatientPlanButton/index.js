import React from 'react';
import {Button} from 'antd';
import { SelectPatientPlan } from '../../../../../Manager/components/Profile/components/ProfileContent/components/Plans/containers/SelectPatientPlan';
import { withToggleModal } from '../../../../../../components/Modal';


const SelectPatientPlanButtonPure = props => {
    const { showModal, toggleModal, label,  ...otherProps } = props;
    const {screening} = otherProps;
    const {title} = screening || {};
    // console.log(props, 'props');
    // const titleButton = <FormattedMessage values={{ title, edit:screening && screening.id !== '' }} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <SelectPatientPlan {...otherProps} onHide={toggleModal} />}
        <Button onClick={toggleModal} icon={'plus'}>{label}</Button>
    </React.Fragment>
}

export const SelectPatientPlanButton = withToggleModal (SelectPatientPlanButtonPure);