import React from 'react';
import {Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../../../../../components/Modal';
import { ProgramsCatalog } from '../../../../containers/ProgramsCatalog';

const ProgramsCatalogButtonPure = props => {
    const { showModal, toggleModal, asMenuItem = false, asIcon = true, ...otherProps } = props;
	return (
		<React.Fragment>
            {showModal && <ProgramsCatalog {...otherProps} onHide={toggleModal} />}
            <Button onClick={toggleModal} size={'small'}><Icon type={'plus'}  /></Button>
		</React.Fragment>
	);
}

export const ProgramsCatalogButton = withToggleModal(ProgramsCatalogButtonPure);
export default ProgramsCatalogButton;