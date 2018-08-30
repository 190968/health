import PatientInvite from '../components/PatientInvite/components/NetworkForm';
import { graphql } from 'react-apollo';
import React from 'react';
import { compose, withStateHandlers, branch, withHandlers, defaultProps, withProps } from 'recompose';
import { Form } from 'antd';
import gql from 'graphql-tag';
import { withModal } from "../../../../../components/Modal/index";


const GET_PROFILE_FORM = gql`
query GET_PROFILE_FORM ($userId: UID!, $useReports: Boolean!) {
    management {
      getProfileForm {
        id
        label
        fields {
          id
          label
          type
          fieldCode
          useValueIdToReport
          isMandatory
          options {
            id
            label
            key
          }

          getChildren {
            id
            label
            type
            fieldCode
            useValueIdToReport
            isMandatory
            options {
              id
              key
              label
            }
          }

          reports (userId:$userId)  @include(if: $useReports) {
            ...on FormFieldReport {
              id
              valueId
              value
              fieldCode
            }
          }
        }
      }
    }
  }
`;

const withQuery = graphql(GET_PROFILE_FORM, {
    options: (ownProps) => {
      const {patient={}} = ownProps;
      const {id=''} = patient;
      return {
          variables: {
              userId: id || '',
              useReports: id !== ''
          },
          fetchPolicy: 'network-only'
      }
    },
    props: ({ ownProps, data }) => {
        const { management = {} } = data;
        const { getProfileForm = [] } = management || {};
        return { loading: data.loading, getProfileForm };
    },
});

const enhance = compose(
  // defaultProps({
  //   patients:{
  //   firstName:"",
  //   lastName:"",
  //   title:"",
  //   email:"",
  //   gender:"",
  //   birthday:"",
  //   timezone:""
  //   }
  // }),
  withQuery,
  //branch(props => props.patient, withQuery),
  //Form.create(),
  // withHandlers({
  //     onSubmit: props => () => {
  //         //console.log(props, 'Props before input');
  //         props.form.validateFields((err, values) => {
  //             console.log(err);
  //             console.log(values);
  //             if (!err) {
  //                 // props.onSubmit(values).then(({data})=> {
  //                 //     props.onHide();
  //                 // });
  //             }
  //         });
  //     },
  // }),
  withProps(props => {
      const modalTitle = props.patient ? 'Edit '+props.patient.fullName : 'Add Patient';
      return {
          modalTitle,
          modalFooter:false,
          modalWidth:800
      };
  }),
  withModal
);

export default enhance(PatientInvite);