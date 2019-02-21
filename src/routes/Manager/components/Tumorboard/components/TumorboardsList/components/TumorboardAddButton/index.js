import React from 'react';
import {Icon, Button} from 'antd';

import TumorboardEditor from '../../../../containers/TumorboardEditor';
import { withToggleModal } from '../../../../../../../../components/Modal';

const TumorboardAddButtonPure = ({showModal, toggleModal, ...otherProps}) => {
    return <React.Fragment>
        {showModal && <TumorboardEditor {...otherProps} asModal onHide={toggleModal} />}
        <Button type={'primary'} icon={'plus'} onClick={toggleModal} />
    </React.Fragment>
}
 
export const TumorboardAddButton = withToggleModal(TumorboardAddButtonPure);
export default TumorboardAddButton;