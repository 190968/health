import React from 'react';
import { fromJS } from 'immutable';
import {  Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError} from 'react-form'
import Filter from '../../containers/Filter';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'


const FilterForm = (updateFilters, filters) => {
  return <Form
    onSubmit={(values) => {
      console.log('Success!', values)
    }}
    onChange={(state, props, initial, instance) => {
      var values = state.values;
      // console.log(state);
      // update filter and set to the query
    }}
    saveState={(state) => {
      var filters = fromJS(state.values);
      //console.log(onUpdate);
      updateFilters(filters);
      // update filter and set to the query
    }}
    // Let's give the form some default values
    defaultValues={{
      //friends: []
    }}

    // Validating your form is super easy, just use the `validate` life-cycle method
    validate={values => {
      const {name, hobby, status, friends, address} = values
      return {
        name: !name ? 'A name is required' : undefined,
        hobby: (hobby && hobby.length < 5) ? 'Your hobby must be at least 5 characters long' : false,
        status: !status ? 'A status is required' : null,
        /*friends: (!friends || !friends.length) ? 'You need at least one friend!' : friends.map(friend => {
          const { name, relationship } = friend
          return {
            name: !name ? 'A name is required' : undefined,
            relationship: !relationship ? 'A relationship is required' : undefined
          }
        }),
        address: !address ? 'A valid address is required' : 0*/
      }
    }}

    // `onValidationFail` is another handy form life-cycle method
    onValidationFail={() => {
      window.alert('There is something wrong with your form!  Please check for any required values and try again :)')
    }}
  >
    {({values, submitForm, addValue, removeValue, getError}) => {
      // A Form's direct child will usually be a function that returns a component
      // This way you have access to form methods and form values to use in your component. See the docs for a complete list.
      return (
        // When the form is submitted, call the `submitForm` callback prop
        <form onSubmit={submitForm}>

          {Object.keys(filters).map(k => <Filter key={k} filter={filters[k]} />)}

          <button>
            Submit
          </button>
        </form>
      )
    }}
  </Form>
}

export const FilterList = ({ filters, loading, updateFilters, plans_number }) => {

  if (loading) {
    //return (<div>Loading...</div>);
    return (
     <div>
       <div className='box'>
         <div className='box__header'><h3>Filters</h3></div>
         <div className="box__body">
           <div className="box box--filter" style={{marginTop:10}}>
             <div className="box__header">
               <h3>
                 <RectShape rows={1} color="#ddd" style={{height:'13px',  width:'40%'}} />
               </h3>
             </div>
             <div className="box__body">
               <TextBlock rows={5} color="#f2f2f2" />
             </div>
           </div>
           <div className="box box--filter" style={{'marginTop':20}}>
             <div className="box__header">
               <h3>
                 <RectShape rows={1} color="#ddd" style={{height:'13px', width:'60%'}} />
               </h3>
             </div>
             <div className="box__body">
               <TextBlock rows={5} color="#f2f2f2" />
             </div>
           </div>
         </div>
       </div>

     </div>
    );
  }
  //console.log(filters);
  return (
      <div className='box'>
        <div className='box__header'><h3>Filters</h3></div>
        <div className="box__body" style={{'paddingTop':20}}>
          {/*FilterForm(updateFilters, filters)*/}
        </div>
      </div>);

}

/*FilterList.componentWillReceiveProps = (nextProps) => {
  console.log(111);
}*/

FilterList.propTypes = {
  //filters: PropTypes.object.isRequired,
  //loadPlans: PropTypes.func
};

export default FilterList;
