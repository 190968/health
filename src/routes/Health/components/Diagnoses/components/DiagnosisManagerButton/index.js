import React from 'react';
import {Table, Button} from 'antd';
import DiagnosisManager from '../../containers/DiagnosisManager';
const DiagnosisManagerButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <DiagnosisManager {...otherProps} asModal onHide={toggleModal} />}
        <Button size={'small'} icon={'plus'} onClick={toggleModal} />
    </React.Fragment>
}

export default DiagnosisManagerButton;