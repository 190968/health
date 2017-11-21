import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import { Container, Row, Col} from 'reactstrap';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form'
// adding filters

const months = ['Month','January','February','March','April','May','June','July','August','September','October','November','December'];
const monthItems =months.map((item,index) =>
    <option key={index}>{item}</option>
);

const datesArr=['Date'];

 for (var i=1;i<32;i++){
     datesArr.push(i);
 }
const dateItems = datesArr.map((item,index) =>
    <option key={index}>{item}</option>
);

const yearArr=['Year'];

for (var i=1900;i<2018;i++){
    yearArr.push(i);
}
const yearItems = yearArr.map((item,index) =>
    <option key={index}>{item}</option>
);

class SettingLayout extends React.Component {


    static propTypes = {
        //plan: propType(Plan.fragments.plan).isRequired,
        //handleCancel: React.PropTypes.func.isRequired,
    }



    render() {
      return (<Container>
          <Row>
              <Col xs="3">
                  <div className="box">
                    <div className="box__body">aaa</div>
                  </div>
              </Col>
              <Col xs="9">
                  <div className="box">
                      <div className="box__body">

                      <Form
                          onSubmit={(values) => {
      console.log('Success!', values)
    }}

                          // Let's give the form some default values
                          defaultValues={{
      friends: []
    }}

                          // Validating your form is super easy, just use the `validate` life-cycle method
                          validate={values => {
      const { name, hobby, status, friends, address } = values
      return {
        name: !name ? 'A name is required' : undefined,
        hobby: (hobby && hobby.length < 5) ? 'Your hobby must be at least 5 characters long' : false,
        status: !status ? 'A status is required' : null,
        friends: (!friends || !friends.length) ? 'You need at least one friend!' : friends.map(friend => {
          const { name, relationship } = friend
          return {
            name: !name ? 'A name is required' : undefined,
            relationship: !relationship ? 'A relationship is required' : undefined
          }
        }),
        address: !address ? 'A valid address is required' : 0
      }
    }}

                          // `onValidationFail` is another handy form life-cycle method
                          onValidationFail={() => {
      window.alert('There is something wrong with your form!  Please check for any required values and try again :)')
    }}
                      >
                          {({ values, submitForm, addValue, removeValue, getError }) => {
                              // A Form's direct child will usually be a function that returns a component
                              // This way you have access to form methods and form values to use in your component. See the docs for a complete list.
                              return (
                                  // When the form is submitted, call the `submitForm` callback prop
                                  <form onSubmit={submitForm}>



                                      <div>
                                          <h6>Title</h6>
                                          <Select // This is the built-in Select formInput
                                              placeholder="None"
                                              field='title'
                                              options={[{ // You can ship it some options like usual
                label: 'Mr',
                value: 'Mr'
              }, {
                label: 'Mrs',
                value: 'Mrs'
              }]}
                                          />
                                      </div>
                                      <div>
                                          <h6>Name</h6>
                                          <Text // This is the built-in Text formInput
                                              field='name' // field is a string version of the field location
                                              placeholder='Name' // all other props are sent through to the underlying component, in this case an <input />
                                          />

                                          <Text // This is the built-in Text formInput
                                              field='middle name' // field is a string version of the field location
                                              placeholder='Middle name' // all other props are sent through to the underlying component, in this case an <input />
                                          />

                                          <Text // This is the built-in Text formInput
                                              field='surename' // field is a string version of the field location
                                              placeholder='Surename' // all other props are sent through to the underlying component, in this case an <input />
                                          />


                                      </div>

                                      <div>
                                          <h6>Sertification</h6>
                                          <Select // This is the built-in Select formInput
                                              placeholder="None"
                                              field='certification'
                                              options={[{ // You can ship it some options like usual
                label: 'Doctor',
                value: 'doctor'
              }, {
                label: 'Patient',
                value: 'patient'
              }]}
                                          />
                                      </div>

                                      <div>
                                          <h6>Scype username</h6>
                                          <Text // This is the built-in Text formInput
                                              field='scype' // field is a string version of the field location

                                          />
                                      </div>

                                      <div>

                                          <h6>Birthday</h6>

                                          <select // This is the built-in Select formInput
                                              placeholder="Month"
                                              field='month'>
                                              {monthItems}
                                          </select>

                                          <select // This is the built-in Select formInput
                                              placeholder="Date"
                                              field='date'>
                                              {dateItems}
                                          </select>

                                          <select // This is the built-in Select formInput
                                              placeholder="Date"
                                              field='date'>
                                              {yearItems}
                                          </select>


                                      </div>


                                      <div>
                                      <h6>Gender</h6>
                                      <Select // This is the built-in Select formInput
                                          placeholder="None"
                                          field='gender'
                                          options={[{ // You can ship it some options like usual
                label: 'Male',
                value: 'male'
              }, {
                label: 'Female',
                value: 'female'
              }]}
                                      />
                                         </div>




                                      <div>
                                          <h6>Short Bio</h6>
            <Textarea // This is the built-in Textarea formInput
                field='bio'
                placeholder='Short Bio'
            />
                                      </div>

                                      {/* Arrays in forms are super easy to handle */}
                                      <h6>Friends</h6>
                                      {/* This is a custom form error for the root of the friends list (see validation function) */}
                                      <FormError field='friends' />
                                      <div className='nested'>
                                          {!values.friends.length ? (
                                              <em>No friends have been added yet</em>
                                          ) : values.friends.map((friends, i) => ( // Loop over the values however you'd like
                                              <div key={i}>

                                                  <div>
                                                      <h6>Full Name</h6>
                                                      <Text
                                                          field={['friends', i, 'name']} // You can easily pass an array-style field path. Perfect for passing down as props or nested values
                                                          placeholder='Friend Name'
                                                      />
                                                  </div>

                                                  <div>
                                                      <h6>Relationship</h6>
                                                      <Select
                                                          field={`friends.${i}.relationship`} // If you don't like arrays, you can also use a string template
                                                          options={[{
                      label: 'Friend',
                      value: 'friend'
                    }, {
                      label: 'Acquaintance',
                      value: 'acquaintance'
                    }, {
                      label: 'Colleague',
                      value: 'colleague'
                    }]}
                                                      />
                                                  </div>

                                                  <button // This button will remove this friend from the `friends` field
                                                      type='button'
                                                      onClick={() => removeValue('friends', i)} // `removeValue` takes a field location for an array, and the index for the item to remove
                                                  >
                                                      Remove Friend
                                                  </button>

                                              </div>
                                          ))}
                                      </div>

                                      <div>
                                          <button // This button will add a new blank friend item to the `friends` field
                                              type='button'
                                              onClick={() => addValue('friends', {})} // `addValue` takes an array-like field, and the value to add
                                          >
                                              Add Friend
                                          </button>
                                      </div>



                                      <div>
                                          <label>
                                              <Checkbox // This is the built-in checkbox formInput
                                                  field='createAccount'
                                              />
                                              <span>Create Account?</span>
                                          </label>
                                      </div>

                                      <div>
                                          <h6>Notify me via</h6>
                                          <RadioGroup field="notificationType">
                                              <label>
                                                  <Radio // This is the built-in radio formInput
                                                      value='email' // This is the value the field will be set to when this radio button is active
                                                  />
                                                  <span>Email</span>
                                              </label>
                                              <label>
                                                  <Radio
                                                      value='text'
                                                  />
                                                  <span>Text</span>
                                              </label>
                                              <label>
                                                  <Radio
                                                      value='phone'
                                                  />
                                                  <span>Phone</span>
                                              </label>
                                          </RadioGroup>
                                      </div>

                                      <br />
                                      <br />

                                      {/* // Since this is the parent form, let's put a submit button in there ;) */}
                                      {/* // You can submit your form however you want, as long as you call the `submitForm` callback */}
                                      <button>
                                          Submit
                                      </button>
                                  </form>
                              )
                          }}
                      </Form>

                  </div>
              </div></Col>
              </Row>
          </Container>)
    }
}
//
//SettingLayout.propTypes = {
    //counter: PropTypes.number.isRequired,
    //increment: PropTypes.func.isRequired,
    //doubleAsync: PropTypes.func.isRequired,
    //loading: PropTypes.bool,

    /*  data: React.PropTypes.shape({
          loading: React.PropTypes.bool,
          error: React.PropTypes.object,
          plans: React.PropTypes.object,
      }).isRequired,*/
//}


export default SettingLayout
