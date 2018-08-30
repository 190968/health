import React from 'react';
import {Table, Button} from 'antd';
import Calculators from '../../../../containers/Calculators';
const CalculatorButton = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    return <React.Fragment>
        {showModal && <Calculators {...otherProps} onHide={toggleModal} />}
        <Button icon="calculator" style={{ marginRight: 8}} onClick={toggleModal}>Calculators</Button>
    </React.Fragment>
}

export default CalculatorButton;