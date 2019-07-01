import React from 'react';
import {Timeline, Tag, Tooltip, Card, Popover, Icon, Row, Col, Progress, Badge, Avatar} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import TimelineElementDelete from './containers/TimelineElementDelete';
import TimelineElementEdit from './containers/TimelineElementEdit';
import {injectIntl} from 'react-intl';
import LinkElement from '../../../../../../../../../Plan/components/Plan/components/LinkElement';
import MediaElement from '../../../../../../../../../Plan/components/Plan/components/PlanMedia';
import ClinicalNoteElement from '../../../../../../../../../Plan/components/Plan/components/ClinicalNoteElement';
import CancerStage from '../../../../../../../../../Plan/components/Plan/components/CancerStage/view';
import './styles.less';
import TreatmentElement from "../../../../../../../../../Plan/components/Plan/components/TreatmentElement/index";
import { DragSource } from 'react-dnd'
import {branch, compose, renderComponent, withHandlers, withProps} from 'recompose';
import TumorboardView from "../../../../../../../Tumorboard/containers/TumorboardView";
import {FitIcon} from "../../../../../../../../../../components/FitIcon/index";
import {CommentsModalFromIcon, Comments} from "../../../../../../../../../../components/Comments/index";
import {PlanAvatar} from "../../../../../../../../../../components/Avatars/components/PlanAvatar/index";
import {getIconByFileType, formatFileName} from "../../../../../../../../../../components/FormCustomFields/components/Attachments/index";
import { TreatmentPlanBody } from '../../../../../../../../../Plan/containers/TreatmentPlanBody';
import TransitionDetails from '../../../../../Transitions/components/TransitionDetails';
import VisitDetails from '../../../../../Visits/components/VisitDetails';
import { HealthViewNoModal } from '../../../../../../../../../Health/containers/View';
import { TimelineElementChecklist } from './containers/Checklist';
import FootnoteView from '../../../../../../../../../../components/Footnote/components/View';
import { AttachmentsModules } from '../../../../../../../../../../components/FormCustomFields/containers/AttachmentsModules';

export const getTimelineElementCardTitle = (item) => {
    // console.log(item, 'item');
    const {activity={}} = item;
    let {type, typeText=''} = item;
    let elTitle = '';
    let {title='', label='', text='', footnote} = activity || {};

    //console.log(title, 'item');
    switch (type) {
        case 'clinical_note':
            elTitle = title;
            break;
        case 'link':
            let {url=''} = activity;
            elTitle = label+(url ? ' '+url : '');
            break;
        case 'instruction':
            return 'Instruction';
            break;
        case 'media':
            const {mediaType} = activity;
            typeText = mediaType;
            elTitle = label;
            break;
        case 'treatment':
            elTitle = title;
            //console.log(elTitle);
            break;
        case 'visit':
            //console.log(activity);
            const {isFollowUp, visitTypeTxt} = activity || {};
            if (isFollowUp) {
                typeText = 'Follow Up';
            }
            elTitle = visitTypeTxt;
            //console.log(typeText);
            break;
        case 'checklist':
            elTitle = label;
            break;
        case 'calculator':
            // console.log(activity);
            // elTitle = label+'tttitle';
            break;
        case 'health_record':
        case 'add_health':
            let {typeText} = activity;
            elTitle = typeText;//+' - '+title;
            break;
        case 'plan_assigned':
            const {plan = {}} = activity;
            const {type:planType} = plan;
            if (planType=== 'treatment') {
                return 'Treatment Plan Assigned';
            }
            //const {}
            break;
    }
    //console.log(typeText);
    //console.log(typeText);
    //console.log(typeText+(elTitle !== '' ? ' - '+elTitle : ''));
    return typeText+(elTitle !== '' ? ' - '+elTitle : '');

}

const colorsByType = {
    updates: '#4285F6',
    todo: '#fed835',
    plan: '#f5511e',
    treatment: '#34A853',
    health: '#ee685c',
    media: '#585858',
    visit: '#7baf41',
    cancer_stage: '#8c25a8',
    tumorboard: '#3f51b5',
    team: '#ed6d01'
}

const getColor = type => {
    return colorsByType[type] || '#f2f2f2';
}



export const TimelineElementView = (item, props={}) => {
    const {handleReport=false, getOnlyActivity=false} = props;

    const {activity, type, getReport={}} = item;
    const {footnote} = activity || {};
    //const {key, item, userId, showElement=false, getOnlyActivity=false, activeElement={}} = props;
    //const {activity, isCritical, date, notes, type = '', createdAt, creator = {}, source=''} = item;
    //const {id, fullName} = creator;
    //const {id:activeElementId} = activeElement;
    //console.log(item);
    //console.log(activity);
    let activityText = '';//'Unknown Activity';
    //let extra = {};
    let body = [];
    let image = '';
    let group = 'updates';
    //let color = '';
    let percent = 0;
    let progress = '';
    //let description = notes;
    let icon = <Icon type='api' />;
    switch (type) {
        case 'basic':
            activityText = activity.text;
            body.push(activity.text);
            break;
        case 'link':
            activityText = <LinkElement item={activity} />;
            icon = <Icon type='link' />;
            body.push( activity.description || '');
            break;
        case 'instruction':
            activityText = <span dangerouslySetInnerHTML={{__html:activity.text}} />;
            //body.push();
            break;
        case 'media':
            const {mediaType:activityType='', filename:label=''} = activity;
            activityText = <MediaElement item={activity} />;
            icon = getIconByFileType({type:activityType, label});
            group = 'media';
            progress = formatFileName(activity, {showSize:false});
            //body.push( activity.description || '');
            break;
        case 'new_transition':
            const {typeTxt=''} = activity;
            progress = typeTxt;
            activityText = <TransitionDetails transition={activity} />;
            //activityText = ;
            break;
        case 'visit':
            const {subjective=''} = activity || {};
            progress = subjective;
            activityText = activity && <VisitDetails visit={activity} />;//<TransitionDetails transition={activity} />;
            //activityText = ;
            break;
        case 'clinical_note':
           
            icon = <FitIcon icon='clinical-note' />;
            activityText = <ClinicalNoteElement item={activity} cardOpts={ {bordered:false, type:"timeline"}} />;
            if (!getOnlyActivity && activity.note !== '') {
                body.push(activity.note);
            }
            const {footnote} = activity;
            //<FootnoteView footnote={footnote} />

            const {attachments = []} = activity;
            let imageData2 = attachments.filter(item => item.type === 'image');
            imageData2 = imageData2.map(image => image.url);
            //console.log(imageData2);

            if (imageData2.length > 4) {
                imageData2 = imageData2.slice(0, 4);
            }
            //console.log(imageData2);
            //ReactPhotoGrid
            // if (imageData2.length > 0) {
            //     image = <div style={{width: 200, height: 200, overflow: 'hidden'}}><ReactPhotoGrid
            //         gridSize="200x200"
            //         data={imageData2}/>
            //
            //     </div>;
            // }
            break;
        case 'treatment':
            group = 'treatment';
            icon = <FitIcon icon='treatment' />;
            //progress = <Progress percent={0} />;
            const {details:treatmentDetails} = activity || {};
            activityText = <TreatmentElement item={treatmentDetails} handleReport={handleReport} />;//<Card type="timeline ant-card-type-treatment" bordered={false} title="Treatment" extra={extra} >
            break;
        case 'checklist':
            const {optionId:reportValues=[]} = getReport || {};
            activityText = <TimelineElementChecklist item={activity} handleReport={handleReport} reports={reportValues}  />;
            const total = activity.options.length || 0;
            if (reportValues.length > 0) {
                // let reported = 0;
                // reports.map(report => {
                //     console.log(report.value, 'reportValue');
                //     reported += report.value.length;
                //     return null;
                // });

                percent = reportValues.length/total*100;
                if (percent > 0) {
                    percent = Math.floor(percent);
                }
            }
            progress = <React.Fragment>
                {!getOnlyActivity && <TimelineElementChecklist item={activity} handleReport={handleReport} reports={reportValues} simple={false}  />}
                <Progress percent={percent} />
                </React.Fragment>;
            group = 'todo';
            icon = <FitIcon icon="to-do"/>
            break;
        case 'cancer_stage':
            group = 'cancer_stage'
            activityText = <CancerStage item={activity}  />;
            icon = <FitIcon icon="stage"/>
            break;
        case 'health_record':
        case 'add_health':
            //activityText = activity.title;
            // console.log(activity);
            group = 'health';
            icon = <Icon type='medicine-box' />;
            
            activityText = <HealthViewNoModal healthRecord={activity} />;
            const {title:acvitityTitle} = activity || {}; 
            body.push(acvitityTitle);
            break;
        case 'clinical_trial':
            activityText = activity.title;
            body.push(activityText);
            //console.log(activityText, 'CLTRIAL');
            //body.push(activity.notes);
            group = 'health';
            icon = <FitIcon type='evaluation' />;
            break;
        case 'tumorboard':
            //activityText = activity.title;
            activityText = <TumorboardView tumorboard={activity}   />;
            group = 'tumorboard';
            icon = <FitIcon icon="tumorboard"/>
            body.push(activity.notes);
            break;
        case 'request_join_user_manager':
            icon = <FitIcon icon="actionplan"/>;
            group = 'team';
            break;
        case 'plan_assigned':
            const {plan = {}} = activity;
            const {type:planType} = plan;
            icon = <FitIcon icon="actionplan"/>;
            if (planType === 'treatment') {
                activityText = <TreatmentPlanBody treatmentPlan={plan} />
            } else {
                activityText = <PlanAvatar plan={plan} />;
            }
            if (!getOnlyActivity) {
                progress = plan.title;
            }
           
            break;
        case 'plan_created':
            icon = <FitIcon icon="actionplan"/>;
            activityText = <PlanAvatar plan={activity} />;
            progress = activity.title;
            break;
        case 'discharge_plan':
            const {isActive, getAttachments} = activity;
            icon = <FitIcon icon="actionplan"/>;
            activityText = <AttachmentsModules value={getAttachments} editable={false} /*  date={getFieldValue('endDate')} /*task={task}*/ />
            progress = 'Discharge Plan'+(isActive ? '' : ' (Draft)');
            break;
        case 'plan_approved':
        case 'plan_share_hp_approved':
            icon = <FitIcon icon="actionplan"/>;
            group = 'plan';
            body.push(activity.text);
            break;
        case 'calculator':
            const {extraDetails} = activity || {}
            body.push(extraDetails);
            // console.log(activity, 'activity');
                icon = <Icon type="calculator" />;
                //activityText = extraDetails;
                //progress = extraDetails;//activity.title;
                break;
        default:
            //activityText = activity.text;
            body.push(activity.text);
            break;
    }
    const color = getColor(group);

    let title = getTimelineElementCardTitle(item);
    if (footnote) {
        title = <>{title} <FootnoteView footnote={footnote} /></>
    }

    return {body, color, activityText, image, icon, progress, title};
}


const TimelineElement = props => {

        const {item, user, showElement=false, getOnlyActivity=false, activeElement={}, handleReport=false, draggable:isDraggable=false} = props;
        const {id: telid, isCritical, notes,  createdAt, creator = {}, source=''} = item;
        const {id, fullName} = creator;
        const {id:activeElementId} = activeElement || {};
         
        const {body, color, activityText, image, icon, progress, title} = TimelineElementView(item, {handleReport, getOnlyActivity});

        let boxTitle = title;
        //activityText = <Card type="timeline" title={} extra={extra} >{activityText}</Card>;
        if (notes !== '') {
            body.push(<div key={'notes'} style={{fontSize:'0.9em',color:'#ccc'}}>{notes}</div>);
        }

        if (getOnlyActivity) {
 
            return <React.Fragment>
                <Card title={title}
                         extra={[<TimelineElementEdit key={'edit'} item={item} user={user} />, <TimelineElementDelete  key={'delete'} item={item} user={user} />]}
            >
                {activityText}
                {body && <div>{body}</div>}
                {progress}
                <div className="ant-card-comments" style={{padding:10}}>
                    <Comments type="timeline" id={telid} title="Notes" />
                </div>
            </Card>



            </React.Fragment>;
        }

        let infoContent = [
            <Tooltip title="Created" key={1}><div><Icon type="clock-circle-o" style={{marginRight:5}} />{moment(createdAt).format('lll')}</div></Tooltip>
            ];

            let sourceText;
        if (source) {
            // infoContent.push(<Tooltip title="Source">
            //     <div>
            //         <div style={{
            //             marginRight:5,
            //             border: '1px solid rgba(0, 0, 0, 0.85)',
            //             borderRadius: '50% 50%',
            //             lineHeight: '1.12em',
            //             fontSize: '0.8em',
            //             'textAlign': 'center',
            //             height: 14,
            //             width: 14,
            //             display: 'inline-block'
            //         }}>P</div>
            //         {source}</div>
            // </Tooltip>);


            sourceText = <React.Fragment>
                <Tooltip title={source}>
                <div style={{
                    // marginRight:5,
                    // border: '1px solid #51ade2',
                    // borderRadius: '50% 50%',
                    // lineHeight: '1.3em',
                    // 'textAlign': 'center',
                    // height: 20,
                    // width: 20,
                    // fontWeight: 'normal',
                    display: 'inline-block',
                    color:'#51ade2'
                }}>P</div>
            </Tooltip>

            </React.Fragment>
        }


        const html =  <Card type={"timeline "+(isCritical ? 'critical' : '') + (isDraggable ? ' isDraggable ' : '') + (activeElementId === item.id ? ' active-element' : '')} hoverable onClick={showElement ? showElement : undefined}  >
            {/* {isCritical && <span style={{position:'absolute', top:0, right:2, lineHeight:'1em'}} ><Tooltip title="Critical"><Badge dot /></Tooltip></span>} */}
            <div className={"timeline-icon"} style={{backgroundColor: color}}>
                {icon}
            </div>
            <div className="timeline-text">
                <div className="timeline-actions"  >

                        <CommentsModalFromIcon type="timeline" id={telid} />
                   <Popover key="1" title={[<Icon type="user" key="user" style={{marginRight:5}}  />, <span key="fullname">{fullName}</span>]} content={infoContent} trigger="hover"><Icon type="info-circle-o" style={{marginLeft:5}} /></Popover>
                </div>
                <div className="timeline-date">{sourceText}{/*<Icon type="clock-circle-o" style={{marginRight:5, display:'none'}} />{moment(createdAt).format('L')}*/}</div>

                {image && <div className="timeline-image">{image}</div>}
                <h4 style={{margin:0}}>{boxTitle}</h4>
                {progress}
                <Truncate lines={1}>{body}</Truncate>
            </div>
        </Card>;
        return html;
}
 


const canBeDraggable = (props) => {
    const {item:element, draggableTemplate} = props;
    const {type} = element || {};
    // console.log(type, 'type');
    // console.log(props, 'props');
    switch(draggableTemplate) {
        case 'treatmentPlan':
            switch(type) {
                default:
                    return false;
                case 'checklist':
                case 'clinical_note':
                case 'diagnosis':
                case 'assessment':
                case 'ap':
                case 'treatment':
                return true;
            }
    }
    return true;
    return element.type !== 'tumorboard';// && element.type !== 'condition';
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
        console.log(props, 'ppppppp');
        console.log(monitor);
        return canBeDraggable(props);
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
    withProps(props => {
        const {draggable} = props;
        if (draggable) {
            return {
                draggable: canBeDraggable(props)
            }
        }
    }),
    branch(props => props.draggable, renderComponent(TimelineElementDraggable)),
    withHandlers({
        showElement: props => () => {
            const {showElement, item} = props;
            if (showElement) {
                showElement(item);
            }
        }
    })
);

export default enhance(TimelineElement);
