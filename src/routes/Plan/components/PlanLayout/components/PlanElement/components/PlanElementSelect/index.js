import React from 'react'
import PropTypes from 'prop-types';
import {Row, Card, Col, Tag, Icon } from 'antd';
import {FitIcon} from "../../../../../../../../components/FitIcon/index";

let gridStyle = {
    //width: '50%',
    textAlign: 'center',
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
            {type:'tracker', label:'Tracker', icon: <FitIcon icon="tracker"/>},
            {type:'options', label:'Options', icon: <FitIcon icon="select-many"/>},
            {type:'textInput', label:'Input', icon: <FitIcon icon="openended-text"/>},
            {type:'scale', label:'Scale', icon: <FitIcon icon="scale-el"/>},
            {type:'fileInput', label:'File', icon: <FitIcon icon="file"/>},
            {type:'assessment', label:'Assessment', icon: <FitIcon icon="assessment"/>},
            {type:'calculator', label:'Calculator', icon: <Icon type="calculator" />},
            {label:'To Do', type:'checklist', icon: <FitIcon icon="to-do"/>},
        ];

        const outputElements = [
            {type:'text', label:'Text', icon: <Icon type="file-text" />},
            {type:'image', label:'Image', icon:<Icon type="picture" />},
            {type:'video', label:'Video', icon: <Icon type="video-camera" />},
            {type:'audio', label:'Audio', icon: <FitIcon icon="audio" />},
            {type:'document', label:'Document', icon:<Icon type="file" />},
        ];

        const toolsElements = [
            {label:'Conditional', type:'condition', icon: <FitIcon icon="conditional"/>},
            {label:'Go To', type:'alias', icon: <FitIcon icon="goto"/>},
            {label:'Decision', type:'decision', icon: <Icon type="share-alt" />},
            {type:'line', label:'Line', icon: <FitIcon icon="line"/>},
            {type:'tipbox', label:'Tip', icon: <Icon type="bulb" />},
            {type:'link', label:'Link', icon:<Icon type="link"/>},
            {type:'embed', label:'Embed', icon: <FitIcon icon="embed"/>},
        ];

        if (mode === 'lesson') {
            inputElements = inputElements.filter(el => el.type !== 'tracker' && el.type !== 'calculator');
        }


        let elements = [];
        if (mode === 'pathway' || mode === 'decision') {
            elements.push(
                ['Tools', [
                    //{label:'Diagnosis', type:'diagnosis'},
                    {label:'To Do', type:'checklist', icon: <FitIcon icon="to-do"/>},//
                    {label:'Decision', type:'decision', icon: <Icon type="share-alt" />},
                    {label:'Conditional', type:'condition', icon: <FitIcon icon="conditional"/>},
                    {label:'Clinical Note', type:'clinical_note', icon: <FitIcon icon="clinical-note"/>},
                    {label:'Treatment', type:'treatment', icon:<FitIcon icon='treatment' />},
                    {label:'Go To', type:'alias', icon: <FitIcon icon="goto"/>},
                    {label:'Link', type:'link', icon:<Icon type="link"/>},//
                    {label:'ActionPlan', type:'ap', icon: <FitIcon icon="actionplan"/>},//
                ], 14]
            );

            elements.push(
                ['Media', [
                    // separate group
                    
                    {type:'image', label:'Image', icon:<Icon type="picture" />},
                    {type:'video', label:'Video', icon: <Icon type="video-camera" />},
                    {type:'audio', label:'Audio', icon: <FitIcon icon="audio" />},
                    {type:'document', label:'Document', icon:<Icon type="file" />},

                    //{label:'Regimen(TDB)', type:'regimen'},
                    //{label:'Procedure order(TDB)', type:'procedureOrder'},
                    //{label:'Reminder)', type:'reminder (TBD)'},
                    //{label:'Evaluation(TDB)', type:'evaluation'},
                    //{label:'Care Plan(TDB)', type:'discharge'}
                ], 10]
            );
        // } else if (mode === 'decision') {
        //     elements.push(
        //         ['', [
        //             {label:'Treatment', type:'treatment'},
        //             {label:'To Do', type:'checklist'},
        //             {label:'Clinical Note', type:'clinical_note'},
        //         ]]
        //     );
        } else {
            let width = 12;

            if (mode !== 'introduction') {
                width = 8;
                elements.push(['Input', inputElements, width]);
            }
            elements.push(['Output', outputElements, width]);
            elements.push(['Tools', toolsElements, width]);
        }
        console.log(elements);
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

        return <Row gutter={16}>
            {elements.map(info => {
                const size = info[2] || 12;
                let curGridStyle = {};
                if (size > 10) {
                    curGridStyle = {
                        width: '33.3%',
                        textAlign: 'center',
                        minHeight:50,
                        cursor: 'pointer'
                    }
                } else {
                    curGridStyle = {
                        width: '50%',
                        textAlign: 'center',
                        minHeight:50,
                        cursor: 'pointer'
                    }
                }
                //console.log(gridStyle);
                return <Col sm={size} key={info[1]}><Card gutter={5} title={info[0]} type={'pure'} bordered={false}>{info[1].map(({label, type, icon}) => {
                    return <Card.Grid style={curGridStyle} key={label} span={8} onClick={() => this.handleSelection(type)}><div className="ant-card-grid--hovered"><div style={{fontSize:'1.6em'}}>{icon}</div> {label}</div></Card.Grid>
                })}</Card></Col>
            })}
            </Row>
        
    }
}