import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import {  Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError} from 'react-form'

import { Modal, FormGroup, Label, Input, FormText, ModalHeader, ModalBody, ModalFooter, Row, Col, Che} from 'reactstrap';


import Slider from 'react-filters/dist/Slider';

export class FilterBody extends React.Component {
  constructor(props) {
    super(props);
    this.buildCheckboxTemplate = this.buildCheckboxTemplate.bind(this);
  }
  static propTypes = {
    filter: PropTypes.object.isRequired,
    activeFilters: PropTypes.object,
    activeFilters: PropTypes.object,
  }
  buildCheckboxTemplate(item) {
    const { filter, activeFilters } = this.props;
    //console.log(filter);
    //console.log();
    var name = filter.code+'[a'+item.value+']';
  /*return <div className="form-check abc-checkbox">
    <input className="form-check-input" id="checkbox1" type="checkbox" />
    <label className="form-check-label" htmlFor="checkbox1">
      Check me out
    </label>
  </div>*/

    return <FormGroup check>
      <Label check>
        <Input type="checkbox" id="checkbox2" />{' '}
        {item.text}
      </Label>
    </FormGroup>
   /* return <label><Checkbox
      field={name}
    /><span>{item.text}</span></label>;*/
  }
  onChecboxChange(e, item) {
    const { filter, activeFilters } = this.props;
    const nextActiveFilters = activeFilters;
    if(e.target.checked) {
      nextActiveFilters[filter.id] = { ...nextActiveFilters[filter.id], [item.value]: item };
    } else {
      delete nextActiveFilters[filter.id][item.value];
    }
    if(window && window.innerWidth > 1024) {
      window.scrollTo(0, 143);
    } else {
      window.scrollTo(0, 56);
    }
    this.setFilters(nextActiveFilters);
  }
  setFilters(nextActiveFilters) {
    const str =
      Object.keys(nextActiveFilters).reduce((pV, cV) =>
          Object.values(nextActiveFilters[cV]).length > 0 ?
            `${ pV }/${ cV }-${ typeof nextActiveFilters[cV] === 'string' ?
              nextActiveFilters[cV] :
              Object.keys(nextActiveFilters[cV]).join(',') }` :
            pV
        , '');
    browserHistory.push(str ? `/catalog/f${ str }` : '/catalog');
  }
  render() {
    const {
      filter,
      openFilterId,
    } = this.props;
    //console.log(filter.fields);
    return <div >
        {Object.keys(filter.fields).map((k) => {
          const item = filter.fields[k];

          switch(item.type) {
            case 'checkbox':
              return <div className='filter__item' key={`${ filter.id }-${ item.value }`}>
                {this.buildCheckboxTemplate(item)}
              </div>;
              break;
            case 'range_tmp':
              return <Slider key={'${ filter.id }-${ item.value }'} name={ item.value } type="value" min={0} max={100} value={[0,1]} />;
                break;
          };


          return false;
        })}
    </div>;
  }
}

export default FilterBody;
