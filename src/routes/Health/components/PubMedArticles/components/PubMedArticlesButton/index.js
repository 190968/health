import React from 'react';
import {Table, Button} from 'antd';
import PubMedArticles from '../../../../containers/PubMedArticles';
const CalculatorButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <PubMedArticles {...otherProps} asModal onHide={toggleModal} />}
        <Button icon="file-text" style={{ marginRight: 8}} onClick={toggleModal}>PubMed</Button>
    </React.Fragment>
}

export default CalculatorButton;