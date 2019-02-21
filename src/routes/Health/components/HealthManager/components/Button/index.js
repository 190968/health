import React from 'react';
import {Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../components/Modal';
import { HealthManager } from '../../../../containers/HealthManager';
const HealthManagerButtonPure = props => {
    const {showModal, toggleModal, icon, iconOnly=false, asText=false, label, ...otherProps} = props;
    let button = '';

    if (icon) {
        if (iconOnly) {
            button = <Icon type={icon} onClick={toggleModal} />
        } else {
            button = <Button size={'small'} icon={icon} onClick={toggleModal} />;
        }
    }
    return <React.Fragment>
        {showModal && <HealthManager {...otherProps} asModal onHide={toggleModal} />}
        {asText ? <div onClick={toggleModal} >{label}</div> : icon ?  button : <Button size={'small'} icon={'plus'} onClick={toggleModal} />}
    </React.Fragment>
}

export const HealthManagerButton = withToggleModal(HealthManagerButtonPure);