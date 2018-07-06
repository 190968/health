import React from 'react';
import {Icon} from 'antd';
export const getLabelFromElement = (element={}, props={}) => {
    const {itemInfo:item={},itemType, type, typeText} = element;
    const {isBuilderMode=false, showType=true} = props;
    let fieldTitle = '';
    //console.log(element, item);
    switch(itemType) {
        default: break;
        case 'measurement_input':
            //const {measurement={}} = item;
            fieldTitle = item.label;//<Measurement item={item} date={date} onChange={this.onChange} />
            break;
        case 'choice_input':
        case 'checklist':
            fieldTitle = item.label;
            break;
        case 'radio_input':
            fieldTitle = item.label;
            break;
        case 'text_input':
            fieldTitle = item.label;
            break;
        case 'dropdown_input':
        case 'condition':
            fieldTitle = item.label;
            break;
        case 'decision':
            fieldTitle = item.label;
            break;
        case 'scale_input':
            fieldTitle = item.label;
            break;
        case 'file_input':
            fieldTitle = item.label;
            break;
        case 'exam_input':
            fieldTitle = item.name;
            break;
        case 'instruction':
        case 'instruction_embed':
            break;
        case 'clinical_note':
            fieldTitle = item.title || '';
            break;
        case 'line':
            if (showType) {
                fieldTitle = 'Line';
            }
            break;
        case 'instruction_tipbox':
            if (showType) {
                fieldTitle = 'Tipbox';
            }
            break;
        case 'link':;
            fieldTitle = item.label;
            break;
        case 'media':
            fieldTitle = item.label;
            //field = <PlanMedia item={item} />
            break;
        case 'treatment':
            fieldTitle = item.title;
            break;
        case 'diagnosis':
        if (showType) {
            fieldTitle = 'Diagnosis';
        }
            break;
        case 'cancer_stage':
        if (showType) {
            fieldTitle = 'Stage';
        }
            break;
        case 'alias':
            fieldTitle = item.label || '';//getLabelFromElement(element.itemInfo);
            break;
        case 'ap':
            fieldTitle = item.title;
            break;

    }
    if (showType && isBuilderMode) {
        fieldTitle = typeText+(fieldTitle !== '' ? ' – ' : '')+ fieldTitle;
    }

    return fieldTitle;
}