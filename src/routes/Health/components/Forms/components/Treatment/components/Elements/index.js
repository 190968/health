
import React from 'react';
import {List, Card} from 'antd';
import TreatmentElementManagerButton from '../Button';
import {TreatmentFormElement} from './containers/Element';
import { getTreatmentElementLabel } from '../ElementManager';
import { TreatmentElementDeleteButton } from './containers/DeleteButton';
const TreatmentFormElements = (props) => {
    const { elements=[], ...otherProps } = props;
    const {user, updateElement, deleteElement} = otherProps;
    return <React.Fragment>

        {elements.length > 0 && <List
            size="small"
            itemLayout={'vertical'}
            split={false}
            // grid={{ gutter: 16, column: 2 }}
            dataSource={elements}
            renderItem={(element, k) => {
                let actions = [];
                actions.push(<TreatmentElementManagerButton key={'edit'} treatmentElement={element} updateElement={updateElement}  user={user} edit />);
                actions.push(<TreatmentElementDeleteButton key={'delete'} treatmentElement={element} handleDelete={deleteElement} />);
                return <List.Item key={k} >
                        <Card title={getTreatmentElementLabel(element)} extra={actions}><TreatmentFormElement element={element} /></Card>
                    </List.Item>
            }}
        />}

        <TreatmentElementManagerButton {...otherProps} />
    </React.Fragment>
};

export default TreatmentFormElements;