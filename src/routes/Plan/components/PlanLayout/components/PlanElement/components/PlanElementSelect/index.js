import React from 'react'
import PropTypes from 'prop-types';
import {Row, Card, Col, Tag, Icon, Tabs } from 'antd';
import {FitIcon, IconCustom} from "../../../../../../../../components/FitIcon/index";

const TabPane = Tabs.TabPane;

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
            {type:'tracker', label:'Tracker', icon: <IconCustom type="tracker"/>},
            {type:'options', label:'Options', icon: <IconCustom type="options"/>},
            {type:'textInput', label:'Input', icon: <IconCustom type="input"/>},
            {type:'scale', label:'Scale', icon: <IconCustom type="scale"/>},
            {type:'fileInput', label:'File', icon: <IconCustom type="file"/>},
            {type:'assessment', label:'Assessment', icon: <IconCustom type="assessment"/>},
            {type:'calculator', label:'Calculator', icon: <IconCustom type="calculator" />},
            {label:'To Do', type:'checklist', icon: <IconCustom type="to-do"/>},
        ];

        const outputElements = [
            {type:'text', label:'Text', icon: <IconCustom type="text" />},
            {type:'image', label:'Image', icon:<IconCustom type="image" />},
            {type:'video', label:'Video', icon: <IconCustom type="video" />},
            {type:'audio', label:'Audio', icon: <IconCustom type="audio" />},
            {type:'document', label:'Document', icon:<IconCustom type="document" />},
        ];

        const toolsElements = [
            {label:'Conditional', type:'condition', icon: <IconCustom type="conditional"/>},
            // {label:'Go To', type:'alias', icon: <IconCustom type="go-to"/>},
            {label:'Decision', type:'decision', icon: <IconCustom type="decision" />},
            {type:'line', label:'Line', icon: <IconCustom type="line"/>},
            {type:'tipbox', label:'Tip', icon: <IconCustom type="tip" />},
            {type:'link', label:'Link', icon:<IconCustom type="link"/>},
            {type:'embed', label:'Embed', icon: <IconCustom type="embed"/>},
        ];

        if (mode === 'lesson') {
            inputElements = inputElements.filter(el => el.type !== 'tracker' && el.type !== 'calculator');
        }

        // console.log(mode);
        let elements = [];
        if (mode === 'pathway' || mode === 'decision') {
            elements.push(
                ['Tools', [
                    //{label:'Diagnosis', type:'diagnosis'},
                    {label:'To Do', type:'checklist', icon: <IconCustom type="to-do"/>},//
                    {label:'Decision', type:'decision', icon: <IconCustom type="decision" />},
                    {label:'Conditional', type:'condition', icon: <IconCustom type="conditional"/>},
                    {label:'Clinical Note', type:'clinical_note', icon: <IconCustom type="clinical-note"/>},
                    {label:'Treatment', type:'treatment', icon:<IconCustom type='treatment' />},
                    // {label:'Go To', type:'alias', icon: <IconCustom type="go-to"/>},
                    {label:'Link', type:'link', icon:<IconCustom type="link"/>},//
                    {label:'ActionPlan', type:'ap', icon: <IconCustom type="actionPlan"/>},//
                ], 14]
            );

            elements.push(
                ['Media', [
                    // separate group
                    
                    {type:'image', label:'Image', icon:<IconCustom type="image" />},
                    {type:'video', label:'Video', icon: <IconCustom type="video" />},
                    {type:'audio', label:'Audio', icon: <IconCustom type="audio" />},
                    {type:'document', label:'Document', icon:<IconCustom type="document" />},

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


        return <Tabs defaultActiveKey={"0"} type="card">
            {elements.map((info, el_i) => {
                const size = info[2] || 12;
                
                // if (size > 10) {
                //     curGridStyle = {
                //         width: '33.3%',
                //         textAlign: 'center',
                //         minHeight:50,
                //         cursor: 'pointer'
                //     }
                // } else {
                //     curGridStyle = {
                //         width: '50%',
                //         textAlign: 'center',
                //         minHeight:50,
                //         cursor: 'pointer'
                //     }
                // }
                //console.log(gridStyle);
                return <TabPane tab={info[0]} key={el_i}>
                    <Card type={'pure'} >
                    {info[1].map(({label, type, icon}) => {
                    return <Card.Grid style={gridStyle} key={label}  onClick={() => this.handleSelection(type)}><div className="ant-card-grid--hovered"><div style={{fontSize:'2.6em'}}>{icon}</div> {label}</div></Card.Grid>
                    })}
                </Card>
                </TabPane>
            })}
        </Tabs>
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