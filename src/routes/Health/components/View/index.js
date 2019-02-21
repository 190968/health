import React from 'react';
import { Card } from 'antd';
import { HealthManagerButton } from '../HealthManager/components/Button';
import { DrawerFooter } from '../../../../components/Modal';
import { HealthViewElement } from './containers/ViewElement';
import { HealthDeleteButton } from '../HealthManager/containers/DeleteButton';
const HealthView = props => {
    const {healthRecord, user} = props;
    console.log(props);

    return <React.Fragment>
        <Card >
        <HealthViewElement {...props} />
    </Card>
    <DrawerFooter>
        <span><HealthDeleteButton onDelete={props.refetch} healthRecord={healthRecord} user={user} /></span>
        <span style={{marginLeft: 5}}><HealthManagerButton healthRecord={healthRecord} user={user} icon={'edit'} iconOnly /></span>
    </DrawerFooter>
        </React.Fragment>
}

export default HealthView;