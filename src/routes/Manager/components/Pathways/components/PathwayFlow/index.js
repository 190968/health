import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import { compose, withHandlers, withProps } from 'recompose';
import './index.less';
//PlanElementChildrenListWithQue
const convertElementsToCode = (elements, props) => {
	let nodeDataArray = [];
	let linkDataArray = [];

	const {elementsByElements={}} = props;

	const elementsTotal = elements.length;
	console.log(elements, 'Elements');
	let prevElement = null;
	elements.map((element, i) => {
		const { id, itemType, typeText, itemInfo, hasChildren/*, childrenElements=[]*/} = element;

		const data = { key: id, name: typeText, bgColor: '#e6f7ff', color: '#91d5ff', itemInfo,  text: ''  };
		let haveConnection = true;

		const childrenElements = elementsByElements[id] || null;

		switch (itemType) {
			case 'clinical_note':
				const {title, note=''} = itemInfo;
				data['name'] = title;
				data['text'] = note;
				break;
			case 'checklist':
				let todoHtml = '';
				const {options:todoOptions=[]} = itemInfo;
				todoOptions.map(option => {
						const {label, value} = option;
						console.log(label);
						todoHtml += label+' \n';
						return null;
					});
					console.log(todoHtml);
				data['text'] = todoHtml;
				break;
			case 'decision':
				const { options = [] } = itemInfo;
				data.bgColor = '#5ac6c4';
				data.color = '#b7eb8f';
				options.map((option) => {
					const { label, value } = option;
					nodeDataArray.push({ key: 'opt' + value, name: label, color: 'green' });
					linkDataArray.push({ from: id, to: 'opt' + value });
					return null;
				});
				haveConnection = false;
				break;
			case 'treatment':
				let treatHtml = '';
				const { elements = [] } = itemInfo;
				data.color = '#b7eb8f';
				elements.map((option) => {
					const { type } = option;
					//nodeDataArray.push({ key: 'opt' + value, name: label, color: 'green' });
					//linkDataArray.push({ from: id, to: 'opt' + value });
					treatHtml += type+' \n';
					return null;
				});
				data['text'] = treatHtml;
				break;
			case 'condition':
				const { options: condOption = [], label } = itemInfo;
				data.name = label;
				data.bgColor = '#fff1f0';
				data.color = '#fff1f0';
				condOption.map((option) => {
					const { label, value } = option;
					nodeDataArray.push({ key: 'cond' + value, name: label, color: 'blue', bgColor: '#5ac6c4' });
					linkDataArray.push({ from: id, to: 'cond' + value });
					//console.log(childrenElements);
					if (childrenElements) {

						const childrenElement = childrenElements[value] || [];
						//console.log(childrenElement);
						if (childrenElement.length > 0) {
							// append children
							const childrenCodes = convertElementsToCode(childrenElement, props);
							console.log(childrenCodes);
							const {nodeDataArray:childrenNodeDataArray=[], linkDataArray:childrenLinkDataArray=[]} = childrenCodes;

							nodeDataArray = [...nodeDataArray, ...childrenNodeDataArray];
							linkDataArray = [...linkDataArray, ...childrenLinkDataArray];
							//console.log(childrenNodeDataArray);
							// add connection as well
							if (childrenNodeDataArray[0]) {
								const {key:childrenID} = childrenNodeDataArray[0];
								//console.log(childrenID, 'childrenID');
								//nodeDataArray.push(childrenNodeDataArray[1]);
								linkDataArray.push({ from:  'cond' + value , to:childrenID });
							}
						}
					} else {
						props.loadChildren(id, value);
					}
					//if (hasChildren) {
						// load children of this item.
						
					//}
					return null;
				});

				// const childrenCodes = convertElementsToCode(childrenElements, props);

				// const {nodeDataArray:childrenNodeDataArray=[], linkDataArray:childrenLinkDataArray=[]} = childrenCodes;

				// // we need to attach first element from this children to this item
				// if (childrenNodeDataArray[1]) {
				// 	const {key:childrenID} = childrenNodeDataArray;
				// 	nodeDataArray.push(childrenNodeDataArray[1]);
				// 	linkDataArray.push({ from:  id , to:childrenID });
				// }
				// // these children elements shuold be linked to shi cond+value
				// //linkDataArray.push({ from: id, to: 'cond' + value });
				// console.log(childrenNodeDataArray);
				// console.log(childrenLinkDataArray);

				//nodeDataArray = [...nodeDataArray, childrenCodes.nodeDataArray];
				//linkDataArray = [...linkDataArray, childrenCodes.linkDataArray];

				break;
		}

		

		nodeDataArray.push(data);

		if (i > 0 && haveConnection) {
			// if this is not the fist item
			const { id: prevId } = prevElement;
			linkDataArray.push({ from: prevId, to: id });
		}

		// let label = 'op' + i;
		// if (i === 0) {
		// 	label = 'st';
		// 	// start element
		// 	st = label + '=>start: ' + typeText + '\n';
		// 	code += st;
		// } else if (elementsTotal === i + 1) {
		// 	// end element
		// 	e = 'e=>end: ' + typeText + '\n';
		// 	code += e;
		// } else {
		// 	label = 'op' + i;
		// 	// just add element
		// 	code += label + '=>operation: ' + typeText + '\n';
		// 	rules += label + '->';
		// }
		prevElement = element;

		return null;
	});

	//rules += 'e';
	console.log(nodeDataArray);
	console.log(linkDataArray);

	return {
		nodeDataArray,
		linkDataArray
		//nodeDataArray: [
		// { key: 'Alpha', color: 'lightblue' },
		// { key: 'Beta', color: 'orange' },
		// { key: 'Gamma', color: 'lightgreen' },
		// { key: 'Delta', color: 'pink' },
		// { key: 'Omega', color: 'grey' }
		//],
		//linkDataArray: [
		// { from: 'Alpha', to: 'Beta' },
		// { from: 'Alpha', to: 'Gamma' },
		// { from: 'Beta', to: 'Delta' },
		// { from: 'Gamma', to: 'Omega' }
		//]
	};
};
const PathwayFlow = (props) => {
	const { elements= [] } = props;

	const chartModel = convertElementsToCode(elements, props);
	return (
		<GojsDiagram
			key="gojsDiagram"
			diagramId="myDiagramDiv"
			model={chartModel}
			createDiagram={props.createDiagram}
			className="myDiagram"
		/>
	);
};
function textStyle() {
	return { font: '9pt  Segoe UI,sans-serif', stroke: 'white' };
}

const enhance = compose(
	withProps((props) => {
		return {
			model: {
				nodeDataArray: [
					{ key: 'Alpha', color: 'lightblue' },
					{ key: 'Beta', color: 'orange' },
					{ key: 'Gamma', color: 'lightgreen' },
					{ key: 'Delta', color: 'pink' },
					{ key: 'Omega', color: 'grey' }
				],
				linkDataArray: [
					{ from: 'Alpha', to: 'Beta' },
					{ from: 'Alpha', to: 'Gamma' },
					{ from: 'Beta', to: 'Delta' },
					{ from: 'Gamma', to: 'Omega' }
				]
			}
		};
	}),
	withHandlers({
		createDiagram: (props) => (diagramId) => {
			const $ = go.GraphObject.make;

			const myDiagram = $(go.Diagram, diagramId, {
				initialDocumentSpot: go.Spot.Center,
            	initialViewportSpot: go.Spot.Center,
				layout: $(go.TreeLayout, {
					angle: 90,
					layerSpacing: 35
				}),
				isReadOnly: true,
				allowHorizontalScroll: true,
				allowVerticalScroll: true,
				allowZoom: true,
				allowSelect: false,
				scale:1,
				//autoScale: Diagram.Uniform,
				contentAlignment: go.Spot.Center
			});

			myDiagram.toolManager.panningTool.isEnabled = true;
			myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

			myDiagram.nodeTemplate = $(
				go.Node,
				'Auto',
				{
					//selectionChanged: (node) => this.nodeSelectionHandler(node.key, node.isSelected)
				},
				// define the panel where the text will appear
				// $(
				// 	go.Panel,
				// 	'Table',
				// 	{
				// 		maxSize: new go.Size(150, 999),
				// 		margin: new go.Margin(6, 10, 0, 3),
				// 		defaultAlignment: go.Spot.Left
				// 	},
				// 	$(go.RowColumnDefinition, { column: 2, width: 4 }),
				// 	$(
				// 		go.TextBlock,
				// 		textStyle(), // the name
				// 		{
				// 			row: 0,
				// 			column: 0,
				// 			columnSpan: 5,
				// 			font: '12pt Segoe UI,sans-serif',
				// 			editable: true,
				// 			isMultiline: false,
				// 			minSize: new go.Size(10, 16)
				// 		},
				// 		new go.Binding('text', 'name').makeTwoWay()
				// 	),
				// 	$(go.TextBlock, 'Title: ', textStyle(), { row: 1, column: 0 }),
				// 	$(
				// 		go.TextBlock,
				// 		textStyle(),
				// 		{
				// 			row: 1,
				// 			column: 1,
				// 			columnSpan: 4,
				// 			editable: true,
				// 			isMultiline: false,
				// 			minSize: new go.Size(10, 14),
				// 			margin: new go.Margin(0, 0, 0, 3)
				// 		},
				// 		new go.Binding('text', 'title').makeTwoWay()
				// 	),
				// 	$(
				// 		go.TextBlock,
				// 		textStyle(),
				// 		{ row: 2, column: 0 },
				// 		new go.Binding('text', 'key', function(v) {
				// 			return 'ID: ' + v;
				// 		})
				// 	),
				// 	$(
				// 		go.TextBlock,
				// 		textStyle(),
				// 		{ name: 'boss', row: 2, column: 3 }, // we include a name so we can access this TextBlock when deleting Nodes/Links
				// 		new go.Binding('text', 'parent', function(v) {
				// 			return 'Boss: ' + v;
				// 		})
				// 	),
				// 	$(
				// 		go.TextBlock,
				// 		textStyle(), // the comments
				// 		{
				// 			row: 3,
				// 			column: 0,
				// 			columnSpan: 5,
				// 			font: 'italic 9pt sans-serif',
				// 			wrap: go.TextBlock.WrapFit,
				// 			editable: true, // by default newlines are allowed
				// 			minSize: new go.Size(10, 14)
				// 		},
				// 		new go.Binding('text', 'comments').makeTwoWay()
				// 	)
				// ) // end Table Panel

				$(go.Shape, 'RoundedRectangle', { strokeWidth: 0, fill: "white" }, new go.Binding('fill', 'bgColor'), new go.Binding('stroke', 'color')),
				$(
					go.Panel,
					'Table',
					{ width: 130, minSize: new go.Size(NaN, 20) },
					$(go.RowColumnDefinition, { column: 2, width: 4 }),
					$(
						go.TextBlock,
						{
							name: 'TEXT',
							margin: 6,
							row: 0, column: 0,
							font: '13px Lato, sans-serif',
							editable: true,
							stroke: '#000',
							maxSize: new go.Size(130, NaN),
							alignment: go.Spot.Center
						},
						new go.Binding('text', 'name').makeTwoWay()
					),
					$(
						go.TextBlock,
						{
							name: 'TEXT',
							margin: 6,
							row: 1, column: 0,
							font: '11px Lato, sans-serif',
							editable: true,
							stroke: '#000',
							maxSize: new go.Size(130, NaN),
						},
						new go.Binding('text', 'text').makeTwoWay()
					)
				)

				// $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
				// $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'itemInfo', (v) => {
				// 	console.log(v);
				// 	return <h1>1111</h1>;
				// })),
				//$(go.TextBlock, { margin: 8 }, new go.Binding('text', 'color'))
			);

			return myDiagram;
		}
	})
);

export default enhance(PathwayFlow);
