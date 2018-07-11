import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import { compose, withHandlers, withProps } from 'recompose';
import './index.less';

const convertElementsToCode = (elements) => {
	let code = '';
	let st = '';
	let e = '';
	let vars = '';
	let rules = 'st->';
	const elementsTotal = elements.length;
	console.log(elements);
	elements.map((element, i) => {
		const { typeText } = element;
		let label = 'op' + i;
		if (i === 0) {
			label = 'st';
			// start element
			st = label + '=>start: ' + typeText + '\n';
			code += st;
		} else if (elementsTotal === i + 1) {
			// end element
			e = 'e=>end: ' + typeText + '\n';
			code += e;
		} else {
			label = 'op' + i;
			// just add element
			code += label + '=>operation: ' + typeText + '\n';
			rules += label + '->';
		}

		return null;
	});

	rules += 'e';
	console.log(code);
	console.log(rules);

	return code + rules;
};
const PathwayFlow = (props) => {
	const { pathway } = props;
	const { elements = [] } = pathway;

	const chartCode = convertElementsToCode(elements);
	return (
		<GojsDiagram
			key="gojsDiagram"
			diagramId="myDiagramDiv"
			model={props.model}
			createDiagram={props.createDiagram}
			className="myDiagram"
		/>
	);
};

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
				initialContentAlignment: go.Spot.LeftCenter,
				layout: $(go.TreeLayout, {
					angle: 0,
					arrangement: go.TreeLayout.ArrangementVertical,
					treeStyle: go.TreeLayout.StyleLayered
				}),
				isReadOnly: false,
				allowHorizontalScroll: true,
				allowVerticalScroll: true,
				allowZoom: false,
				allowSelect: true,
				autoScale: Diagram.Uniform,
				contentAlignment: go.Spot.LeftCenter
			});

			myDiagram.toolManager.panningTool.isEnabled = false;
			myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

			myDiagram.nodeTemplate = $(
				go.Node,
				'Auto',
				{
					selectionChanged: (node) => this.nodeSelectionHandler(node.key, node.isSelected)
				},
				$(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
				$(go.TextBlock, { margin: 8 }, new go.Binding('text', 'color'))
			);

			return myDiagram;
		}
	})
);

export default enhance(PathwayFlow);
