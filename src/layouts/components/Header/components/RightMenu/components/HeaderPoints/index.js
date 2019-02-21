import React from 'react';
import {Popover, Icon, Progress} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './i18n/en';

const HeaderPoints = props => {
    const {motivation} = props;
    const {currentLevel} = motivation || {};
    const {points=0, info, nextLevel} = currentLevel || {};
    const {amount=0, title:nextLevelTitle} = nextLevel || {};
    const progress= Math.round(points/amount*100);
    const pointsToGo = amount-points;
    console.log(progress);
    //console.log(props, 'motivation PROPS');
    const content = <div>
        <div>
            <FormattedMessage values={{points:pointsToGo, title:nextLevelTitle}} {...messages.pointsToGo} />
        </div>
    <Progress percent={progress} />
    </div>;
    return <Popover content={content} title={<FormattedMessage values={{points}} {...messages.points} />}>
    <Icon type="star" theme="filled" style={{color:'orange'}} />
    </Popover>
}

export default HeaderPoints;