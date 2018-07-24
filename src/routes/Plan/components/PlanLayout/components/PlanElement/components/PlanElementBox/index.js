import React from 'react';
import { Divider, Modal, Icon, Upload, Alert, Button, Card, Tooltip, Checkbox } from 'antd';

import Measurement from '../../../../containers/PlanMeasurement';
import PlanElementActions from '../../containers/PlanElementActions';

import PlanChecklist from '../../../../../Plan/components/Checklist';
import PlanRadio from '../../../../../Plan/components/Radio';
import PlanInputText from '../../../../../Plan/components/PlanInputText';
import PlanScale from '../../../../../Plan/components/PlanScale';
import PlanDropdown from '../../../../../Plan/components/PlanDropdown';
import PlanMedia from '../../../../../Plan/components/PlanMedia';
import LinkElement from '../../../../../Plan/components/LinkElement';
import AliasElement from '../../../../../Plan/components/AliasElement';
import TextElement from '../../../../../Plan/components/TextElement';
import ClinicalNoteElement from '../../../../../Plan/components/ClinicalNoteElement';
import TreatmentElement from '../../../../../Plan/components/TreatmentElement';
import DecisionElement, { FootNoteButton } from '../../../../../Plan/components/DecisionElement';
import ConditionElement from '../../../../../Plan/components/ConditionElement';
import CalculatorElement from '../../../../../Plan/components/CalculatorElement';
import { getLabelFromElement } from '../../../PlanElementBuilder/utils';
import './index.less';
import { FitIcon } from '../../../../../../../../components/FitIcon/index';

const PlanElementBox = (props) => {
	let {
		currentInOrder = null,
		element,
		date,
		isDraggable,
		onDrop,
		isBuilderMode,
		isPreviewMode,
		plan,
		upid,
		schedule,
		mode,
		i = 0,
		lessonId,
		sectionId,
		parentId,
		parentValue,
		showElementsAsCard = false,
		withCompleteCheckmark = false
	} = props;

	const { id, itemType, type, itemInfo, reports, hasChildren = false } = element;
	const item = itemInfo;

	let field = itemType;
	let { showAdd = isBuilderMode && !isPreviewMode } = props;
	let addAfter = true;
	//field = item_type;
	let fieldTitle = '';
	let reportValues = [];
	let showTitle = true;
	let titleExtra = false;
	//console.log(props);
	switch (itemType) {
		default:
			break;
		case 'measurement_input':
			//showTitle = false;
			field = <Measurement item={item} date={date} isBuilderMode={isBuilderMode} onChange={props.onChange} />;
			break;
		case 'choice_input':
		case 'checklist':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			field = (
				<PlanChecklist
					item={item}
					reports={reportValues}
					isBuilderMode={isBuilderMode}
					onChange={props.onChange}
				/>
			);
			//const vertically = item.is_vertically;
			fieldTitle = item.label;
			break;
		case 'radio_input':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];
			field = (
				<PlanRadio item={item} reports={reportValues} isBuilderMode={isBuilderMode} onChange={props.onChange} />
			);
			fieldTitle = item.label;

			break;
		case 'text_input':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];

			fieldTitle = item.label;
			field = (
				<PlanInputText
					item={item}
					reports={reportValues}
					isBuilderMode={isBuilderMode}
					onChange={props.onChange}
				/>
			);

			break;
		case 'dropdown_input':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];
			fieldTitle = item.label;
			if (itemType === 'condition') {
				addAfter = false;
			}
			field = (
				<PlanDropdown
					item={item}
					isBuilderMode={isBuilderMode}
					showChildren={props.showChildren}
					hasChildren={hasChildren}
					reports={reportValues}
					onChange={props.onChange}
				/>
			);

			break;
		case 'condition':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];
			fieldTitle = item.label;
			if (itemType === 'condition') {
				addAfter = false;
			}
			field = (
				<ConditionElement
					item={item}
					isBuilderMode={isBuilderMode}
					showChildren={props.showChildren}
					hasChildren={hasChildren}
					reports={reportValues}
					onChange={props.onChange}
				/>
			);
			break;
		case 'decision':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];

			const { footnote } = element;
			if (footnote) {
				titleExtra = <FootNoteButton footnote={footnote} />;
			}
			//fieldTitle = item.label;
			field = (
				<DecisionElement
					id={id}
					plan={plan}
					item={item}
					mode={mode}
					isDraggable={isDraggable}
					onDrop={onDrop}
					isPreviewMode={isPreviewMode}
					isBuilderMode={isBuilderMode}
					showChildren={props.showChildren}
					hasChildren={hasChildren}
					reports={reportValues}
					onChange={props.onChange}
				/>
			);
			break;
		case 'scale_input':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];

			fieldTitle = item.label;

			field = (
				<PlanScale item={item} reports={reportValues} isBuilderMode={isBuilderMode} onChange={props.onChange} />
			);

			break;
		case 'file_input':
			fieldTitle = item.label;
			field = (
				<Upload>
					<Button disabled>
						<Icon type="upload" /> Upload
					</Button>
				</Upload>
			);
			break;
		case 'exam_input':
			fieldTitle = item.name;
			field = <Button disabled>{fieldTitle}</Button>;
			break;
		case 'instruction':

		case 'instruction_embed':
			fieldTitle = '';
			field = <TextElement item={item} />;
			break;
		case 'clinical_note':
			fieldTitle = null;
			//showTitle = false;
			//console.log(item);
			const { title, note = '' } = item;
			field = (
				<ClinicalNoteElement
					item={item}
					isPreviewMode={isPreviewMode}
					isBuilderMode={isBuilderMode}
					mode={mode}
					plan={plan}
				/>
			); //
			break;
		case 'line':
			const { height, color } = item;
			let opts = { height: height };
			if (color !== '') {
				opts.background = color;
			}
			field = <Divider style={opts} />;
			break;
		case 'instruction_tipbox':
			fieldTitle = '';
			field = (
				<Alert
					message="Tipbox"
					description={<div dangerouslySetInnerHTML={{ __html: item.text }} />}
					type="info"
					showIcon
				/>
			);
			break;
		case 'link':
			field = <LinkElement item={item} />;
			//link_path":"https://ya.ru","label":"Yandex","description":"search engine"
			break;
		case 'media':
			//fieldTitle = item.label;
			field = <PlanMedia item={item} />;
			break;

		case 'treatment':
			fieldTitle = item.title;
			field = <TreatmentElement plan={plan} isPreviewMode={isPreviewMode} mode={mode} item={item} />;
			break;
		case 'diagnosis':
			//fieldTitle = 'Diagnosis';
			field = 'Set patient diagnoses';
			break;
		case 'cancer_stage':
			fieldTitle = 'Stage';
			field = 'Set patient stage';
			break;
		case 'alias':
			field = (
				<AliasElement
					onDrop={onDrop}
					isBuilderMode={isBuilderMode}
					plan={plan}
					upid={upid}
					i={i}
					element={element}
				/>
			);
			break;
		case 'ap':
			fieldTitle = itemInfo.title;
			if (isBuilderMode || isPreviewMode) {
				field = <Button disabled>Get Plan</Button>;
			} else {
				field = ''; //<Button>Get Plan</Button>;
			}

			break;
		case 'calculator':
			//fieldTitle = itemInfo.title;
			//console.log(element);
			//console.log(itemInfo);
			field = (
				<CalculatorElement
					isPreviewMode={isPreviewMode}
					date={date}
					plan={plan}
					upid={upid}
					actFieldId={id}
					element={itemInfo}
					isBuilderMode={isBuilderMode}
					onChange={props.onChange}
				/>
			);
			break;
	}

	let className = isBuilderMode ? 'element' : '';
	//onsole.log(currentInOrder);
	//console.log(i);
	if (currentInOrder === i) {
		className += ' active-element';
	}
	//console.log(props);
	let addBeforeEl = null;
	let addAfterEl = null;
	if (isBuilderMode && !isPreviewMode) {
		if (props.element) {
			//console.log(parentId);
			//console.log(parentValue);
			// if we have elemnent - add as parent
			addBeforeEl = (
				<PlanElementActions
					element={element}
					id={id}
					i={i}
					lessonId={lessonId}
					sectionId={sectionId}
					plan={plan}
					type=""
					view="decision"
					mode={mode}
					schedule={schedule}
					buttons={[ 'addBefore' ]}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
			addAfterEl = (
				<PlanElementActions
					element={element}
					id={id}
					i={i}
					lessonId={lessonId}
					sectionId={sectionId}
					plan={plan}
					type=""
					view="decision"
					mode={mode}
					schedule={schedule}
					buttons={[ 'addAfter' ]}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
		} else {
			addBeforeEl = (
				<PlanElementActions
					id={id}
					i={i}
					lessonId={lessonId}
					sectionId={sectionId}
					plan={plan}
					type=""
					mode={mode}
					schedule={schedule}
					buttons={[ 'addBefore' ]}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
			addAfterEl = (
				<PlanElementActions
					id={id}
					i={i}
					lessonId={lessonId}
					sectionId={sectionId}
					plan={plan}
					type=""
					mode={mode}
					schedule={schedule}
					buttons={[ 'addAfter' ]}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
		}
	} else {
		showAdd = false;
	}

	return (
		<div className={className} style={{ position: 'relative', width: '100%' }}>
			{showAdd &&
			i === 0 && (
				<Divider className="element-actions" style={{ marginTop: -10 }}>
					{addBeforeEl}
				</Divider>
			)}

			<PlanElementCard
				showTitle={showTitle}
				element={element}
				isBuilderMode={isBuilderMode}
				isPreviewMode={isPreviewMode}
				withCompleteCheckmark={withCompleteCheckmark}
                plan={plan}
				extra={
					isBuilderMode && !isPreviewMode ? (
						<PlanElementActions
							id={id}
							i={i}
							lessonId={lessonId}
							sectionId={sectionId}
							plan={plan}
							type=""
							mode={mode}
							schedule={schedule}
							parentId={parentId}
							parentValue={parentValue}
						/>
					) : (
						titleExtra
					)
				}
			>
				{field}
			</PlanElementCard>
			{showAdd &&
			addAfter && (
				<Divider className="element-actions" style={{ marginBottom: -15 }}>
					{addAfterEl}
				</Divider>
			)}
		</div>
	);
};

export default PlanElementBox;

const PlanElementCard = ({ children, element, showTitle, isBuilderMode, withCompleteCheckmark=false, isPreviewMode=false, extra = {}, plan={} }) => {
    const { footnote = '', reference = '' } = element;
    const {type} = plan;
    let bordered = true;
	let hoverable = isBuilderMode && !isPreviewMode;
	const showType = type !== 'ap';
    if (type === 'ap') {
        bordered = false;
	}
	//console.log(element);
	let title = showTitle ? getLabelFromElement(element, { isBuilderMode: isBuilderMode, footnote, showType }) : false; //'Add name of'

	if (title && withCompleteCheckmark) {
		title = <React.Fragment>
			<Checkbox style={{marginRight:5}} />
			{title}
		</React.Fragment>;
	}
	const useExtra = false; //footnote !== '' && reference !== '';
	return (
		<Card title={title} bordered={bordered} hoverable={hoverable} type={element.itemType} extra={extra}>
			{children}

			{useExtra && (
				<React.Fragment>
					<Card.Meta description={footnote} />
					<Card.Meta description={reference} />
				</React.Fragment>
			)}
		</Card>
	);
};
