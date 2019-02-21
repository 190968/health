import React from 'react';
import {Card, Tooltip, Badge, Icon,} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import TimelineElementFull from './full';
import { TimelineElementView } from '.';
import { withToggleModal } from '../../../../../../../../../../components/Modal';

const TimelineElementWidget = props => {
    const {showModal, toggleModal, ...otherProps} = props;
    console.log(props);
    console.log(props,' Element props');
        const {key, item, user, showElement=false, getOnlyActivity=false, activeElement={}, handleReport=false} = otherProps;
        const {id: telid, activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
        const {id, fullName} = creator;
        const {id:activeElementId} = activeElement || {};
         
        const {body, color, activityText, image, icon, progress, title} = TimelineElementView(item, {handleReport});

        let boxTitle = title;

        if (source) {


            boxTitle = <React.Fragment>
                {boxTitle} <Tooltip title={source}>
                <div style={{
                    marginRight:5,
                    border: '1px solid #51ade2',
                    borderRadius: '50% 50%',
                    lineHeight: '1.3em',
                    'textAlign': 'center',
                    height: 20,
                    width: 20,
                    fontWeight: 'normal',
                    display: 'inline-block',
                    color:'#51ade2'
                }}>P</div>
            </Tooltip>

            </React.Fragment>
        }

    return <React.Fragment>
        {showModal && <TimelineElementFull {...otherProps} onHide={toggleModal} />}
       
        <Card type={"timeline"} hoverable  onClick={toggleModal} >
        {isCritical && <span style={{position:'absolute', top:0, right:2, lineHeight:'1em'}} ><Tooltip title="Critical"><Badge dot /></Tooltip></span>}
        <div className={"timeline-icon"} style={{backgroundColor: color}}>
            {icon}
        </div>
        <div className="timeline-text">
        
            <div className="timeline-date"><Icon type="clock-circle-o" style={{marginRight:5, display:'none'}} />{moment(createdAt).format('L')}</div>

            {image && <div className="timeline-image">{image}</div>}
            <h4 style={{margin:0}}>{boxTitle}</h4>
            {progress}
            <Truncate lines={1}>{body}</Truncate>
        </div>
    </Card>
    </React.Fragment>
}

export default withToggleModal(TimelineElementWidget);