import React from 'react';
import {compose, withProps} from 'recompose';
import {Card, Tooltip, Badge, Icon,} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import { TimelineElementView } from '.';
import { withDrawer } from '../../../../../../../../../../components/Modal';

const TimelineElementFullPure = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    console.log(props);
    console.log(props,' Element props');
        const {key, item, user, showElement=false, getOnlyActivity=false, activeElement={}, handleReport=false} = otherProps;
        const {id: telid, activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
        const {id, fullName} = creator;
        const {id:activeElementId} = activeElement || {};
         
        const {body, color, activityText, image, icon, progress, title} = TimelineElementView(item, {handleReport});

        let boxTitle = title;

        return <React.Fragment>
        <Card title={title}
                //  extra={[<TimelineElementEdit key={'edit'} item={item} user={user} />, <TimelineElementDelete  key={'delete'} item={item} user={user} />]}
    >
        {activityText}
            {body && <div>{body}</div>}

        <div className="ant-card-comments">
            {/* <Comments type="timeline" id={telid} title="Notes" /> */}
        </div>
    </Card>



    </React.Fragment>;
}

const TimelineElementFull = compose(
    withProps(props => {
        const {item} = props
        const { title} = TimelineElementView(item);

        return {modalTitle:title}
    }),
withDrawer
)(TimelineElementFullPure);

export default TimelineElementFull;