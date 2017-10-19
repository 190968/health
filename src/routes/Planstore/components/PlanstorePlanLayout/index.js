import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { arrayChunk, intersperse } from '../../../../utils/main';

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

import { Modal, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter, Row, Col, Button} from 'reactstrap';
// adding filters
// for modal
import {  Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError} from 'react-form'





const PlanstorePlanPlaceholder = (
  <Row>
    <Col xs="12" sm="4" md="4">
      <div className="ap-card__img ap-card__img--large"><RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/></div>
    </Col>
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




export class PlanstorPlanLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  };
  static propTypes = {
    plan: PropTypes.object,
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


  planDetails()
  {
    const {plan} = this.props;
    const {start_date, end_date, gender, language, elements, categories} = plan;
    const details = [];
    if (start_date != '') {
      details.push(['Start Date', start_date]);
    }
    if (end_date != '') {
      details.push(['End Date', end_date]);
    }
    if (gender != '') {
      details.push(['Gender', gender]);
    }
    if (gender != '') {
      details.push(['Language', language]);
    }

    if (categories.length > 0) {
      var communities = categories.map(el => {
        return <Link to={'/community/'+el.id} key={el.id}>{el.name}</Link>;
      });
      details.push(['Communities', intersperse(communities, ', ')]);
    }
  //console.log(elements);
    if (elements.length > 0) {
      var inside = elements.map(el => {
        return <div key={el[1]}><i className={el[0]+' bump-r'}></i>{el[1]}</div>;
      });
      console.log(inside);
      details.push(['Inside',inside]);
    }
  //console.log(details);
    const chunks = Math.ceil(details.length/2);
    //console.log(chunks);
    const chunked_arr = arrayChunk(details, chunks);
    const cols = [];
    for (var i=0,j=chunked_arr.length; i<j; i++) {
      //console.log(i);
      cols[i] = chunked_arr[i].map(el => {
        return <Row key={el[0]}>
          <Col sm="3">
            <strong>{el[0]}:</strong>
          </Col>
          <Col sm="9">
            {el[1]}
          </Col>
        </Row>;
        //console.log(el.key);
      });
    }
    //console.log(cols)
    return <Row>
      <Col xs="12" sm="6">
        {cols[0]}
      </Col>
      <Col>{cols[1]}</Col>
    </Row>
  };

  render() {
    const {plan, loading} = this.props;
    if (1==12 || loading) {
      console.log(plan);
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
    //console.log(plan);
    //console.log(loading);
    var img = plan.thumb.large;
    var divStyle = {
      backgroundImage: 'url(' + img + ')'
    }

    return (<ReactPlaceholder showLoadingAnimation type='media' rows={4} ready={!loading}>
      <div>
        <div className="box">
          <div className="box__body">
            <Row>
              <Col xs="12" sm="4" md="4">
                <div className="ap-card__img ap-card__img--large" style={divStyle}></div>
              </Col>
              <Col xs="12" sm="8" md="8">
                <div className="ap-card__body">
                  <div className="ap-card__title ap-card__title--large">
                    <h1>{plan.title}</h1>
                  </div>
                  <div className="ap-card__description">
                    <ul>
                    {plan.benefits.map((el, index) => {
                      return <li key={index}>{el}</li>;
                    })}
                    </ul>
                  </div>
                  <div className="ap-card__action">
                    <Button color="primary"  onClick={this.openModal}>Get it!</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="box">
          <div className="box__header">
            <h3>Description</h3>
          </div>
          <div className="box__body">
            {plan.description}
          </div>
        </div>


        <div className="box">
          <div className="box__header">
            <h3>Plan Details</h3>
          </div>
          <div className="box__body">
            {this.planDetails(plan)}
          </div>
        </div>



        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle} className={this.props.className} backdrop='static' keyboard={false}>
          <ModalHeader toggle={this.toggle}>Set your ActionPlan: {plan.title}</ModalHeader>
          <ModalBody>

            <Form
              onSubmit={(values) => {
                console.log('Success!', values)
              }}
              validate={({ name }) => {
                return {
                  name: !name ? 'A name is required' : undefined
                }
              }}
            >
              {({submitForm}) => {
                return (
                  <form onSubmit={submitForm}>
                    <div className="box">
                      <div className="box__header">
                        <h3>Privacy</h3>
                      </div>
                      <div className="box__body">
                        <RadioGroup field="notificationType">
                          <div>
                          <label>
                            <Radio value="email" />{' '}
                            {/*This is the built-in radio formInput*/}
                            <span>Open</span>
                          </label>
                          </div>
                          <div>
                          <label>
                            <Radio value="text" />{' '}
                            {/*This is the built-in radio formInput*/}
                            <span>Private</span>
                          </label>
                          </div>

                        </RadioGroup>
                      </div>
                    </div>


                    <div className="box">
                      <div className="box__header">
                        <h3>Scheduling</h3>
                      </div>
                      <div className="box__body">
                        <FormGroup row>
                          <Label for="scheduling" sm={2}>Starts on</Label>
                          <Col sm={10}>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="scheduling" sm={2}>Ends</Label>
                          <Col sm={10}>
                            <RadioGroup field="notificationType">
                              <div>
                                <label>
                                  <Radio value="haveNoEndDate" />{' '}
                                  {/*This is the built-in radio formInput*/}
                                  <span>Never</span>
                                </label>
                              </div>
                              <div>
                                <label>
                                  <Radio value="haveEndDate" />{' '}
                                  {/*This is the built-in radio formInput*/}
                                  <span>On</span>
                                </label>
                              </div>

                            </RadioGroup>
                          </Col>
                        </FormGroup>
                      </div>
                    </div>

                  </form>
                )
              }}
            </Form>


          </ModalBody>
          <ModalFooter>
            <Button color="primary">Continue</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </ReactPlaceholder>)
  }
}



export default PlanstorPlanLayout
