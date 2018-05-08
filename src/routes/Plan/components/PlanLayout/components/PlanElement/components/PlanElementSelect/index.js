import React from 'react'
import PropTypes from 'prop-types';
import {Card, Col, Tag } from 'antd';

const gridStyle = {
    width: '50%',
    textAlign: 'left',
    minHeight:50,
    cursor: 'pointer'
};

export default class PlanElementsSelect extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    }


    handleSelection = (type) => {
        this.props.onSelect(type);
    }

    printButton = ({type, label, size=12}) => {
        return <Col key={type} md={size} onClick={() => this.handleSelection(type)}><Tag  style={{width:'100%', textAlign:'center', 'marginBottom':5}} >{label}</Tag></Col>;
    }


    getProperElements = (mode) => {
        let inputElements = [
            {type:'tracker', label:'Tracker'},
            {type:'options', label:'Options'},
            {type:'textInput', label:'Input'},
            {type:'scale', label:'Scale'},
            {type:'fileInput', label:'File'},
            {type:'assessment', label:'Assessment'},
            {type:'calculator', label:'Calculator'},
            {label:'To Do', type:'checklist'},
        ];

        const outputElements = [
            {type:'text', label:'Text'},
            {type:'image', label:'Image'},
            {type:'video', label:'Video'},
            {type:'audio', label:'Audio'},
            //{type:'ppt', label:'PPT'},
            {type:'document', label:'Document'},
        ];

        const toolsElements = [
            {label:'Conditional', type:'condition'},
            {label:'Go To', type:'alias'},
            {label:'Decision', type:'decision'},
            {type:'line', label:'Line'},
            {type:'tipbox', label:'Tip'},
            {type:'link', label:'Link'},
            {type:'embed', label:'Embed'},
        ];

        if (mode === 'lesson') {
            inputElements = inputElements.filter(el => el.type !== 'tracker' && el.type !== 'calculator');
        }


        let elements = [];
        if (mode === 'pathway') {
            elements.push(
                ['Elements', [
                    //{label:'Diagnosis', type:'diagnosis'},
                    {label:'To Do', type:'checklist'},//
                    {label:'Decision', type:'decision'},
                    {label:'Conditional', type:'condition'},
                    //{label:'Stage', type:'cancer_stage'},
                    {label:'Clinical Note', type:'clinical_note'},
                    {label:'Treatment', type:'treatment'},
                ]]
            );

            elements.push(
                ['Tools', [
                    // separate group
                    {label:'Go To', type:'alias'},
                    {label:'Link', type:'link'},//
                    {label:'ActionPlan', type:'ap'},//
                    {type:'image', label:'Image'},
                    {type:'video', label:'Video'},
                    {type:'audio', label:'Audio'},
                    {type:'document', label:'Document'},

                    //{label:'Regimen(TDB)', type:'regimen'},
                    //{label:'Procedure order(TDB)', type:'procedureOrder'},
                    //{label:'Reminder)', type:'reminder (TBD)'},
                    //{label:'Evaluation(TDB)', type:'evaluation'},
                    //{label:'Care Plan(TDB)', type:'discharge'}
                ]]
            );
        } else if (mode === 'decision') {
            elements.push(
                ['', [
                    {label:'Treatment', type:'treatment'},
                    {label:'To Do', type:'checklist'},
                    {label:'Clinical Note', type:'clinical_note'},
                ]]
            );
        } else {

            if (mode !== 'introduction') {
                elements.push(['Input', inputElements]);
            }
            elements.push(['Output', outputElements]);
            elements.push(['Tools', toolsElements]);
        }

        return elements;
    }

    render() {

        const {mode, view = false, parentId} = this.props;
        //console.log(this.props);
        const elements = this.getProperElements(view || mode );

        const span = parentId ? 24 : Math.ceil(24/elements.length);
        let size = elements.length > 1 ? 12 : 6;
        // return (<Row gutter={16} >
        //     {elements.map(info => {
        //         return <Col key={info[0]} md={span}>{info[0] !== '' && <h4>{info[0]}</h4>}
        //             <Row gutter={5}>
        //                 {info[1].map((info) => {
        //                     return this.printButton({...info, size})
        //                 })}
        //             </Row>
        //         </Col>
        //     })}
        // </Row>);

        return <Card gutter={5}>
            {elements.map(info => {
                return info[1].map(({label, type}) => {
                    return <Card.Grid style={gridStyle} key={label} span={8} onClick={() => this.handleSelection(type)}>{label}</Card.Grid>
                })
            })}
        </Card>
    }
}