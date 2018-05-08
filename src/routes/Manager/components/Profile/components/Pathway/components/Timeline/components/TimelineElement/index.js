import React from 'react';
import ReactPhotoGrid from 'react-photo-grid';
import {Timeline, Tag, Tooltip, Card, Popover, Icon, Row, Col, Progress, Badge} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import TimelineElementDelete from './containers/TimelineElementDelete';
import TimelineElementEdit from './containers/TimelineElementEdit';
import {injectIntl} from 'react-intl';
import LinkElement from '../../../../../../../../../Plan/components/Plan/components/LinkElement';
import ClinicalNoteElement from '../../../../../../../../../Plan/components/Plan/components/ClinicalNoteElement';
import Checklist from '../../../../../../../../../Plan/components/Plan/components/Checklist';
import CancerStage from '../../../../../../../../../Plan/components/Plan/components/CancerStage/view';
import './styles.less';
import TreatmentElement from "../../../../../../../../../Plan/components/Plan/components/TreatmentElement/index";
import { DragSource } from 'react-dnd'
import {branch, compose, renderComponent} from 'recompose';


export const getTimelineElementCardTitle = (item) => {
    const {activity={}} = item;
    let {type, typeText} = item;
    let elTitle = '';
    let {title='', label='', text=''} = activity;
    console.log(activity, 'item');
    console.log(title, 'item');
    switch (type) {
        case 'clinical_note':
            elTitle = title;
            break;
        case 'link':
            let {url=''} = activity;
            elTitle = label+(url ? ' '+url : '');
            break;
        case 'treatment':
            elTitle = title;
            console.log(elTitle);
            break;
        case 'checklist':
            elTitle = label;
            break;
        case 'health_record':
            let {typeText} = activity;
            elTitle = title;
            break;
    }

    return typeText+(elTitle !== '' ? ' - '+elTitle : '');

}
class TimelineElement extends React.PureComponent {

    render() {
        const {key, item, userId, showElement=false, getOnlyActivity=false, activeElement={}} = this.props;
        const {activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
        const {id, fullName} = creator;
        const {id:activeElementId} = activeElement;
        console.log(item);
        //console.log(activity);
        let activityText = '';//'Unknown Activity';
        let extra = {};
        let body = [];
        let image = '';
        let color = '';
        let progress = '';
        //let description = notes;
        let icon = 'api';

        // if active user
        // if (1===1) {
        //     extra = [
        //         <TimelineElementEdit item={item} userId={userId} />,
        //         <TimelineElementDelete item={item} userId={userId} />
        //    ];
        // }
        switch (type) {
            case 'basic':
                activityText = activity.text;
                body.push(activity.text);
                break;
            case 'link':
                activityText = <LinkElement item={activity} />;
                icon = 'link';
                color = 'red';
                body.push( activity.description || '');
                break;
            case 'clinical_note':
                color = '#orange';
                icon = 'file-text';
                activityText = <ClinicalNoteElement item={activity} cardOpts={ {bordered:false, type:"timeline"}} />;
                if (activity.note !== '') {
                    body.push(activity.note);
                }

                const {attachments = []} = activity;
                let imageData2 = attachments.filter(item => item.type === 'image');
                 imageData2 = imageData2.map(image => image.url);
                //console.log(imageData2);

                if (imageData2.length > 4) {
                    imageData2 = imageData2.slice(0, 4);
                }
                console.log(imageData2);
                //ReactPhotoGrid
                if (imageData2.length > 0) {
                    image = <div style={{width: 200, height: 200, overflow: 'hidden'}}><ReactPhotoGrid
                        gridSize="200x200"
                        data={imageData2}/>

                    </div>;
                }
                break;
            case 'treatment':
                color = '2db7f5';
                icon = 'appstore-o';
                progress = <Progress percent={0} />;
                activityText = <TreatmentElement item={activity}  />;//<Card type="timeline ant-card-type-treatment" bordered={false} title="Treatment" extra={extra} >
                break;
            case 'checklist':
                activityText = <Checklist item={activity}  />;
                progress = <Progress percent={0} />;
                color = '#f56a00';
                break;
            case 'cancer_stage':
                color = '#87d068';
                activityText = <CancerStage item={activity}  />;
                break;
            case 'health_record':
                activityText = activity.title;
                color = '#f56a00';
                icon = 'medicine-box';
                break;
            default:
                activityText = activity.text;
                color = '#108ee9';
                body.push(activity.text);
                break;
        }

        //activityText = <Card type="timeline" title={} extra={extra} >{activityText}</Card>;
        if (notes !== '') {
            body.push(<div style={{fontSize:'0.9em',color:'#ccc'}}>{notes}</div>);
        }

        if (getOnlyActivity) {

            // if (1===1) {
            //     extra = [
            //
            //    ];
            // }
            return <Card title={getTimelineElementCardTitle(item)}
                         extra={[<TimelineElementEdit item={item} userId={userId} />, <TimelineElementDelete item={item} userId={userId} />]}
            >
                {activityText}
            </Card>;
        }

        let infoContent = [
            <Tooltip title="Created"><div><Icon type="clock-circle-o" style={{marginRight:5}} />{moment(createdAt).format('LLL')}</div></Tooltip>
            ];

        if (source) {
            infoContent.push(<Tooltip title="Source">
                <div>
                    <div style={{
                        marginRight:5,
                        border: '1px solid rgba(0, 0, 0, 0.85)',
                        borderRadius: '50% 50%',
                        lineHeight: '1.12em',
                        fontSize: '0.8em',
                        'textAlign': 'center',
                        height: 14,
                        width: 14,
                        display: 'inline-block'
                    }}>P</div>
                    {source}</div>
            </Tooltip>);
        }
        infoContent.push(<div><Icon type="message" style={{marginRight:5}} />Add Note</div>);


        const html =  <Card type={"timeline"+ (activeElementId === item.id ? ' active-element' : '')} hoverable onClick={() => showElement(item)}  >
            {isCritical && <span style={{position:'absolute', top:0, right:2, lineHeight:'1em'}} ><Tooltip title="Critical"><Badge dot /></Tooltip></span>}
            <div className={"timeline-icon"} style={{backgroundColor: color}}>
                <Icon type={icon} />
                <div style={{marginBottom:-20, lineHeight:'1.7em', color: '#ccc', fontSize: '0.8em'}}><Popover key="1" title={[<Icon type="user"  style={{marginRight:5}}  />, fullName]} content={infoContent} trigger="hover"><Icon type="info-circle-o" /></Popover>
                </div>
            </div>
            <div className="timeline-text">
                {image && <div className="timeline-image">{image}</div>}

                <h4 style={{margin:0}}>{getTimelineElementCardTitle(item)}</h4>
                <div style={{color:'#ccc', marginBottom:5, 'fontSize': '0.8em'}}><Icon type="clock-circle-o" style={{marginRight:5, display:'none'}} />{moment(createdAt).format('LLL')}</div>
                {progress}
                <Truncate lines={4}>{body}</Truncate>


            </div>
        </Card>;
        return html;
        // const infoContent = [
        //     <Tooltip title="Created"><div><Icon type="clock-circle-o" style={{marginRight:5}} />{moment(createdAt).format('LLL')}</div></Tooltip>,
        //     <Tooltip title="Source"><div><Icon type="book"  style={{marginRight:5}} />{source}</div></Tooltip>,
        //     <div><Icon type="message" style={{marginRight:5}} /> Add Note</div>
        // ];
        // return (
        //     color={isCritical ? "red" : undefined}
        //     {/*<Timeline.Item key={key} color={isCritical ? "red" : undefined} className="timeline_el"><Popover key="1" title={[<Icon type="user"  style={{marginRight:5}}  />, fullName]} content={infoContent} trigger="hover"><Tag color={isCritical ? 'red' : "blue"}>{moment(date).format('L')}</Tag></Popover> <div className={'timeline_el_text'}>{activityText}</div></Timeline.Item>*/}
        //
        // <Popover key="1" title={[<Icon type="user"  style={{marginRight:5}}  />, fullName]} content={infoContent} trigger="hover"><Tag color={isCritical ? 'red' : "blue"}>{moment(date).format('L')}</Tag></Popover> <div className={'timeline_el_text'}>{activityText}</div>
        // );
    }
}



export const canBeDraggable = (element) => {
    return true;
    return element.type !== 'decision' && element.type !== 'condition';
}
const boxSource = {
    beginDrag(props) {
        //console.log(props);
        return {
            item: props.item,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            props.onDrop(item);
            //alert(`You dropped ${item.element.type} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    },
    canDrag(props, monitor) {
        //console.log(props);
        return canBeDraggable(props.element);
    }
}

const TimelineElementDraggablePure = props => {
    const { isDragging, connectDragSource } = props
    const opacity = isDragging ? 0.4 : 1

    return connectDragSource(<div style={{opacity, marginBottom:10}}><TimelineElement {...props}/></div>);
}
const TimelineElementDraggable = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(TimelineElementDraggablePure);

const enhance = compose(
    injectIntl,
    branch(props => props.draggable, renderComponent(TimelineElementDraggable))
);

export default enhance(TimelineElement);