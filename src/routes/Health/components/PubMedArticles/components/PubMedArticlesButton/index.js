import React from 'react';
import {Table, Button} from 'antd';
import PubMedArticles from '../../../../containers/PubMedArticles';
const CalculatorButton = props => {
    const {showModal, toggleModal, label, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <PubMedArticles {...otherProps} asModal onHide={toggleModal} />}
        {label ? <span onClick={toggleModal}>{label}</span> : <Button icon="file-text" style={{ marginRight: 8}} onClick={toggleModal}>PubMed</Button>}
    </React.Fragment>
}

export default CalculatorButton;