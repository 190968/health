import React from 'react';
import {Tag, Card, Button, Tooltip, Timeline, Icon} from 'antd';
import TimelineElementModal from './containers/TimelineElementModal';
import TimelineElement  from './containers/TimelineElement';
import TimelineElementWidget from './components/TimelineElement/widget';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import TimelineElementSelectAdd from "./components/TimelineElementSelectAdd/index";
import { TimelineFilterButton } from './components/TimelineFilter/components/TimelineFilterButton';
import moment from 'moment';


const TimelinePure = props => {
    const {onlyFilters=false,droppable=false, draggable=false, canDrop=false, isOver=false, items =[], userId, showElement, activeElement, user, isWidget=false} = props;
    const isActive = canDrop && isOver;
    const {filters=null, updateFilters, toggleFilter} = props;
    const {togglePathway, showPathway, onDrop} = props;
    let extra = '';

    const filttersOpts = {filters, updateFilters, /*loadFiltered,*/ toggleFilter};
    if (isWidget) {
        return <Card title="Timeline" >
              {items.map((item, i) => <TimelineElementWidget key={i} item={item} user={user} showElement={showElement} activeElement={activeElement} draggable={draggable} onDrop={onDrop} />)}
        </Card>;
    }


    if (onlyFilters) {
        extra = <TimelineFilterButton {...filttersOpts} />;
    } else {
        extra = <React.Fragment>
            <TimelineFilterButton {...filttersOpts} /> <TimelineElementSelectAdd onSelect={props.onSelectElement} />  <Tooltip title={showPathway ? "Hide Pathway": "Show Pathway" }><Button size={'small'} type={showPathway ? "primary": '' } ghost={showPathway} onClick={togglePathway}   >P</Button></Tooltip>
            </React.Fragment>;
    }

    return <Card title="Timeline" bodyStyle={{overflowY:'auto',background:(canDrop ? '#f6ffed':'transparent'), height:'100vh', backgroundColor:'#f9f9f9', 'marginTop':1}} extra={extra} >
            {props.openAddElement && <TimelineElementModal user={user} type={props.elementType} onHide={props.hideTimelineElement} />}
        
            {canDrop && <div style={{position:'absolute', top:0, left:0, height:'100%', background: '#fff', opacity:'0.7', 'width':'100%', zIndex:999, paddingTop:'20%'}}><center><Tag color="#87d068">{isActive ? 'Release to drop' : 'Drop a box here'}</Tag></center></div>}

            {!filters || filters.length > 0 ?
                <Timeline>
                    {items.map((item, i) => {
                        const {isClinical=false, createdAt, isCritical} = item;
                        // const {icon} = TimelineElementView(item);
                        const icon = isCritical && <Icon type="exclamation-circle" style={{color: 'red'}} />;
                        return <Timeline.Item color={isClinical ? "green" : undefined}
                        key={i}
                        dot={icon}
                        >
                        <div style={{color:'#ccc', fontSize: '0.8em'}}>{moment(createdAt).format('lll')}</div>
                        <TimelineElement item={item} user={user} showElement={showElement} activeElement={activeElement} draggable={draggable} onDrop={onDrop} />
                        
                        </Timeline.Item>;
                    })}
                </Timeline>
                :
                <EmptyList>Please filter at lease one parameter</EmptyList>
            }
        </Card>;
}


// const enhanceTimeline = compose(
//     defaultProps({
//         droppable:false,
//         items: [],
//         totalCount:0,
//         endCursor:'',
//         hasMore:false
//     }),
//     withStateHandlers((props => {
//         const {filters} = props;
//        // console.log(props);
//         return {
//             openAddElement:false,
//             elementType:'',
//             filters,
//             showFilters:false
//         }
//     }),{
//         toggleFilter: props => () => {
//             return {showFilters:!props.showFilters}
//         },
//         updateFilters: props => (filters) => {
//             return {filters}
//         },

//         hideTimelineEl: props => () => {
//             //console.log(props);
//             //props.refetchTimeline();
//             return {openAddElement:false, elementType:''}
//         },

//         onSelectElement: props => (type) => {
//             return {openAddElement:true, elementType:type}
//         }
//     }),
//     withHandlers({
//         hideTimelineElement: props => () => {
//             //console.log(props);
//             props.refetchTimeline();
//             //return {openAddElement:false, elementType:''}
//             props.hideTimelineEl();
//         },
//     })
// );

//const Timeline = enhanceTimeline(TimelinePure);





// const droppableTimelinePure = props => {
//     const {connectDropTarget} = props;
//     //const isActive = canDrop && isOver;
//     return connectDropTarget(<div><Timeline {...props} /></div>);
// }

// const boxTarget = {
//     drop() {
//         return { name: 'Timeline' }
//     },
// }

// const droppableTimeline =  DropTarget('box', boxTarget, (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop(),
// }))(droppableTimelinePure);



// const enhance = compose(
//     branch(props => props.droppable, renderComponent(droppableTimeline)),
// );

export default TimelinePure;
