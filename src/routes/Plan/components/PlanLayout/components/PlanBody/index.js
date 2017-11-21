import React from 'react'
import PropTypes from 'prop-types'

// add placeholders
import PlanBodyMenu from './containers/PlanBodyMenu';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

import { Modal, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter, Row, Col, Button} from 'reactstrap';
// adding filters
// for modal
import {  Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError} from 'react-form'


const PlanstorePlanPlaceholder = (
    <Row>

        <Col xs="12" sm="8" md="8">
            <div className="ap-card__body">
                <div className="ap-card__title ap-card__title--large">
                    <RectShape rows={1} color="#ddd" style={{height:'25px'}} />
                </div>
                <div className="ap-card__description" >
                    <TextBlock rows={3} color="#f2f2f2"/>
                </div>
                <div className="ap-card__action">
                    <RectShape color="#ddd" style={{width:'100px', height:38}}/>
                </div>
            </div>
        </Col>
    </Row>
);




export class PlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    };
    static propTypes = {
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    hideModal = () => {
        this.setState({modalIsOpen: false});
    }
    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }



    render() {
        const {upid, body, loading} = this.props;
        console.info('Render Planbody');
        console.log(this.props);
        if (1==12 || loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <div>
                    <div className="box">
                        <div className="box__body"><ReactPlaceholder rows={7} ready={!loading} customPlaceholder={PlanstorePlanPlaceholder}>Loading</ReactPlaceholder>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box__header"><RectShape color="#ddd" style={{width:'20%', height:15}}/></div>
                        <div className="box__body">
                            <TextBlock rows={3} color="#f2f2f2"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box__header"><RectShape color="#ddd" style={{width:'40%', height:15}}/></div>
                        <div className="box__body">
                            <TextBlock rows={3} color="#f2f2f2"/>
                        </div>
                    </div>
                </div>
            );
        }


        return (<Row>
            <Col xs="12" sm="4" md="3">
                <PlanBodyMenu body={body} />
            </Col>
            <Col xs="12" sm="8" md="9">
                {upid} body elements here.
            </Col>
        </Row>)
    }
}



export default PlanBody
