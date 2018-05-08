import React from 'react';
import { Timeline as TimelineAnt, Tag, Card, Button, Tooltip, Icon, Popover, Affix } from 'antd';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import {compose, branch, renderComponent} from 'recompose';
import TimelineElementSelect from './components/TimelineElementSelect';
import TimelineElementModal from './containers/TimelineElementModal';
import TimelineElement from './components/TimelineElement';
import TimelineFilter from './containers/TimelineFilter';
import {EmptyList} from "../../../../../../../../components/Loading/index";


class Timeline extends React.Component {

    constructor(props) {
        super(props);
        const {filters=null} = props;
        this.state = {
           openAddElement:false,
           elementType:'',
           filters:filters,
           showFilters:false
       }
   }

    // static propTypes = {
    //     connectDropTarget: PropTypes.func.isRequired,
    //     isOver: PropTypes.bool.isRequired,
    //     canDrop: PropTypes.bool.isRequired,
    // }

    static defaultProps = {
        droppable:false,
        items: [],
        totalCount:0,
        endCursor:'',
        hasMore:false
    }

    addTimelineElement = () => {
       // this.setState({openAddElement:true});
    }

    hideTimelineElement = () => {
        this.setState({openAddElement:false, elementType:''});
    }

    /**
     * Opens the modal of select
     */
    onSelectElement = (type) => {
        this.setState({openAddElement:true, elementType:type});
    }

    content = (
        <div>
            <TimelineElementSelect onSelect={this.onSelectElement} />
        </div>
    );



    toggleFilter = () => {
        this.setState({showFilters:!this.state.showFilters});
    }
    updateFilters = (filters) => {
        console.log(filters);
        this.setState({filters});
    }

    render() {

        const {droppable=false, draggable=false, canDrop=false, isOver=false, items =[], userId, showElement, activeElement, } = this.props;
        const isActive = canDrop && isOver;
        const {filters=null, showFilters=false} = this.state;

        const {togglePathway, showPathway, onDrop} = this.props;
        return <div>
                {this.state.openAddElement && <TimelineElementModal userId={userId} type={this.state.elementType} onHide={this.hideTimelineElement} />}
                <Card title="Timeline" bodyStyle={{overflowY:'auto',background:(canDrop ? '#f6ffed':'transparent'), height:'100vh', backgroundColor:'#f9f9f9', 'marginTop':1}}
                      extra={<React.Fragment>
                          <Tooltip title={"Filter"} >
                              <Button icon="filter" size={'small'} type={showFilters ? "primary": '' } ghost={showFilters} onClick={this.toggleFilter} shape="circle" /></Tooltip> <Popover content={this.content} placement="bottom" title="Select Element to Add" trigger="hover"><Tooltip title="Add Element"><Button icon="plus" size={'small'} shape="circle" onClick={this.addTimelineElement} /></Tooltip></Popover> <Tooltip title={showPathway ? "Hide Pathway": "Show Pathway" }><Button size={'small'} type={showPathway ? "primary": '' } ghost={showPathway} onClick={togglePathway} shape="circle" >P</Button></Tooltip></React.Fragment>}
                >
                    {showFilters && <TimelineFilter filters={filters} updateFilters={this.updateFilters} loadFiltered={this.props.loadFiltered} toggleFilter={this.toggleFilter} />}

                    {canDrop && <div style={{position:'absolute', top:0, left:0, height:'100%', background: '#fff', opacity:'0.7', 'width':'100%', zIndex:999, paddingTop:'20%'}}><center><Tag color="#87d068">{isActive ? 'Release to drop' : 'Drag a box here'}</Tag></center></div>}

                    {!filters || filters.length > 0 ?
                <div>
                    {items.map((item, i) => <TimelineElement key={i} item={item} userId={userId} showElement={showElement} activeElement={activeElement} draggable={draggable} onDrop={onDrop} />)}
                </div>
                        :
                        <EmptyList>Please filter at lease one parameter</EmptyList>
                    }
            </Card></div>;
    }
}





const droppableTimelinePure = props => {
    const {connectDropTarget} = props;
    //const isActive = canDrop && isOver;
    return connectDropTarget(<div><Timeline {...props} /></div>);
}

const boxTarget = {
    drop() {
        return { name: 'Timeline' }
    },
}

const droppableTimeline =  DropTarget('box', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(droppableTimelinePure);



const enhance = compose(
    branch(props => props.droppable, renderComponent(droppableTimeline)),
);

export default enhance(Timeline);
