import React from 'react';
import { Button, Tooltip, Icon } from 'antd';
import { withToggleModal } from '../../../../../Modal';
import { DmeEquipmentManager } from '../../containers/EquipmentManager';

const DmeEquipmentManagerButtonPure = props => {
    const { showModal, toggleModal, icon='plus', button=true, buttonLabel, ...otherProps } = props;
    const {equipment} = props;
    const tooltip = equipment ? 'Edit': 'Add';//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    const title = buttonLabel;//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <DmeEquipmentManager {...otherProps} onHide={toggleModal} />}

        <Tooltip title={tooltip} >
            {button ? <Button icon={icon} size={'small'} onClick={toggleModal} >{title}</Button> : <Icon type={icon} onClick={toggleModal}  />}
        </Tooltip>
    </React.Fragment>
}

export const DmeEquipmentManagerButton = withToggleModal(DmeEquipmentManagerButtonPure);