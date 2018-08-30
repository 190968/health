import React from 'react';
import {Table, Button} from 'antd';
import PubMedArticle from '../../containers/PubMedArticle';
const CalculatorButton = props => {
    const {article, showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <PubMedArticle article={article} onHide={toggleModal} />}
        <span  onClick={toggleModal}>{article.title}</span>
    </React.Fragment>
}

export default CalculatorButton;