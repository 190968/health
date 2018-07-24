import PatientInvite from '../components/PatientInvite/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../components/Modal/index";


const GET_PROFILE_FORM = gql`
query GET_PROFILE_FORM {
    management {
      getProfileForm {
        id
        label
        fields {
          id
          type
          label
          isMandatory
          options{
            id
            label
          }
        }
      }
    }
  }
  
`;

const withQuery = graphql(GET_PROFILE_FORM, {
    props: ({ownProps, data }) => {
        const {management={}} = data;
        const {getProfileForm={}} = management;
        return {loading: data.loading, getProfileForm};
    },
});

const enhance = compose(
    withQuery,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            // props.form.validateFields((err, values) => {
            //     console.log(err);
            //     console.log(values);
            // if (!err) {
            //     console.log(values);
            //     props.onHide();
            //     // props.onSubmit(values).then(({data})=> {
            //     //     props.onHide();
            //     // });
            // }
            // });
        },
    }),
    withProps(props => {
        return {modalTitle: 'Add a Patient'}
    }),
    withModal
);

export default enhance(PatientInvite);