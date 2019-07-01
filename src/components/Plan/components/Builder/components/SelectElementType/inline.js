import React from 'react';
import {Tooltip, Row, Col} from 'antd';
import './index.less';
import { getPlanElementsList } from '../../../../../../routes/Plan/components/PlanLayout/components/PlanElement/components/PlanElementSelect';
import { PlanElementManagerButton } from '../Buttons/components/ElementManager';

const PlanbuilderElementSelect = props => {
    const {currentInOrder, mode} = props;
    //<IconCustom type="tracker"/>
    let order = null;
    if (currentInOrder === null) {
        // console.log('no exist');
        order = 0;
    } else if (currentInOrder >= 0) {
        order = currentInOrder+1;
    } else {
        order = 0;
    }
    // currentInOrder && currentInOrder >= 0 ? currentInOrder+1 : 0;
    console.log(props, 'props');
    console.log(currentInOrder, 'currentInOrder');
    console.log(order, 'order');
    const items = getPlanElementsList(mode);
    return <div className={'select-inline'}>
    <Row type="flex" justify="start">{items.map((group, i) => 
        <Col key={i} >
        <div className={'select-inline-label'}>{group[0]}</div>
        {group[1].map((item, i2) => {
            return <span className={'select-inline-item'}  key={i2}>
        <PlanElementManagerButton {...props} type={item.type} element={null} order={order} asButton={false} label={<Tooltip title={item.label} placement={'bottom'}><span>{item.icon}</span></Tooltip>} />
        {/* {item.icon} */}
        </span>
        })}
        </Col>
    )}</Row>
    </div>;
}

export default PlanbuilderElementSelect; 