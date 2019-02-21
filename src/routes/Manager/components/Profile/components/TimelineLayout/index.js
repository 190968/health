import React from 'react';
import { Row, Col } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from './containers/Timeline';
import { TimelineLayoutSider } from './containers/TimelineLayoutSider';
import PathwayContent from '../Pathway/containers/PathwayContent';
// import PathwayContent from './containers/PathwayContent';
// import TimelineElementDetails from './components/Timeline/containers/TimelineElementDetails';

const TimelineLayout = (props) => {
	const { user, showElement, activeElement, openElements, showPathway=false } = props;
	// const showPathway = this.state.showPathway;
	// const showElement = this.state.showElement;
	// const elementsDetails = this.state.elementsDetails;
	// const activeElement = this.state.activeElement;
	const span = showPathway || activeElement ? 12 : 24;

	//
	return (
			<Row>
				<Col span={span} style={{ marginRight: '-1px' }}>
					<Timeline
						user={user}
						droppable
						togglePathway={props.togglePathway}
						showPathway={showPathway}
						showElement={showElement}
						activeElement={activeElement}
					/>
				</Col>
				{activeElement ? (
					<Col span={span}>
						<TimelineLayoutSider
							user={user}
							elements={openElements}
							activeElement={activeElement}
							updateElements={props.updateElements}
							showPathway={showPathway}
							//pathway={this.state.pathway}
							//setPathway={this.setPathway}
							togglePathway={props.togglePathway}
						/>
					</Col>
				) : (
					showPathway && (
						<Col span={span}>
							<PathwayContent user={user} /*pathway={this.state.pathway} setPathway={this.setPathway}*/ />
						</Col>
					)
				)}
			</Row>
	);
};

export default DragDropContext(HTML5Backend)(TimelineLayout);

// export default class Pathway extends React.Component {
//     state = {
//         showPathway: false,
//         showElement: false,
//         elementsDetails: [],
//         activeElement: false,
//         pathway: false
//     }

//     static defaultProps = {
//         userId: ''
//     }

//     togglePathway = () => {
//         this.setState({showPathway: !this.state.showPathway});
//     }

//     setPathway = (pathway) => {
//         this.setState({pathway});
//     }

//     toggleElementView = (element) => {
//         this.setState({showElement: true});
//         this.updateElements(element);

//     }

//     updateElements = (element) => {
//         let {elementsDetails = []} = this.state;
//         const elements = elementsDetails.indexOf(element) === -1 ? [...elementsDetails, element] : elementsDetails;
//         //console.log(elements);
//         this.setState({elementsDetails: elements, activeElement: element});
//     }

//     setElements = (elements, element) => {
//         if (elements.length === 0) {
//             this.setState({showElement: false});
//         }
//         this.setState({elementsDetails: elements, activeElement: element});
//     }

//     addText = (info) => {
//         console.log(info);

//         const newItems = [...this.state.items, info];
//         this.setState({
//             items: newItems
//         })
//     }

//     render() {

//     }
// }
