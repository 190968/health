import SelectExesting from '../components/SelectExesting/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withHandlers, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../../../components/Modal/index";

const GET_PROFILE = gql`
query GET_PROVIDERS ($search: String, $status: RoleStatusEnum = active) {
    network {
      id
      getProviders(search:$search, status: $status) {
        totalCount
        edges {
          id
          name
          typeText
          getTotalPatients
          getTotalCareGivers:getTotalStaff(role: cm)
          getTotalManagers:getTotalStaff(role: manager)
          getAdherence {
              level
          }
        }
      }
    }
  }
`;

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                search:"",
                status:"active",  
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                edges: data.network.getProviders.edges,
                loading: data.loading,
            }
        }
        else {
            return {loading: data.loading}
        }
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
        return {modalTitle: 'Select from Existing Providers'}
    }),
    withModal
);

export default enhance(SelectExesting);