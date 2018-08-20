import PatientInvite from '../components/PatientInvite/components/NetworkForm';
import { graphql } from 'react-apollo';
import React from 'react';
import { compose, withStateHandlers, branch, withHandlers, defaultProps, withProps } from 'recompose';
import { Form } from 'antd';
import gql from 'graphql-tag';
import { withModal } from "../../../../../components/Modal/index";


const GET_PROFILE_FORM = gql`
query GET_PROFILE_FORM {
    management  {
      getProfileForm {
        id
        label
        fields {
          id
          type
          label
          getChildren {
            id
            label
            type
            options {
              id
              key
              label
            }
          }
          isMandatory
          options {
            id
            label
            key
          }
        }
      }
    }
  }
`;

const withQuery = graphql(GET_PROFILE_FORM, {
    props: ({ ownProps, data }) => {
        const { management = {} } = data;
        const { getProfileForm = {} } = management;
        return { loading: data.loading, getProfileForm };
    },
});

const enhance = compose(
  defaultProps({
    patients:{
    firstName:"",
    lastName:"",
    title:"",
    email:"",
    gender:"",
    birthday:"",
    timezone:""
    }
  }),
  branch(props => props.patients, withQuery, withQuery),
  Form.create(),
  withHandlers({
      onSubmit: props => () => {
          //console.log(props, 'Props before input');
          props.form.validateFields((err, values) => {
              console.log(err);
              console.log(values);
              if (!err) {
                  // props.onSubmit(values).then(({data})=> {
                  //     props.onHide();
                  // });
              }
          });
      },
  }),
  withProps(props => {
      const modalTitle = props.patient ? 'Edit Patient' : 'Add Patient';
      return {
          modalTitle,
          modalFooter:false
      };
  }),
  withModal
);

export default enhance(PatientInvite);