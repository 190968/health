// import PatientManager from '../components/PatientInvite/components/NetworkForm';
import PatientManager from '../components/PatientManager';
import { graphql } from 'react-apollo';
import React from 'react';
import { compose, withState, branch, withHandlers, withStateHandlers, withProps } from 'recompose';
import { Form } from 'antd';
import gql from 'graphql-tag';
import { withModal, withStepsState } from "../../../../../components/Modal/index";
import { GET_PROFILE_DETAILS_QUERY } from '../../Profile/components/Details/containers/GeneralInfo';
 
const withQuery = graphql(GET_PROFILE_DETAILS_QUERY, {
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
  withQuery,
  withProps(props => {
      const modalTitle = props.patient ? 'Edit '+props.patient.fullName : 'Add Patient';
      return {
          modalTitle,
          modalFooter:false,
          modalWidth:800
      };
  }),
  withModal,
  branch(props => !props.patient, withState('patient', 'setPatient')),
  withStepsState(props => props.getProfileForm.map(item => item.id))
);

export default enhance(PatientManager);