
import InviteEmail from '../components/index';
import { graphql } from 'react-apollo';
import React from 'react';
import {compose,withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal} from "../../../../../../Modal/index";
const GET_PROFILE  = gql`
query GET_USER_TEAM($user_id:UID) {
    patient(id: $user_id) {
       id
       motivation {
              careTeam {
                  totalCount,
                  edges{
                      id,
                      user {
                          phoneFormatted
                      }
                      joinedDate
                      roleText
                  }
              }
       }
    }
  }
`;


const withQueryEmail = graphql(GET_PROFILE, {
    options: ({patient}) => {
        return {
            variables: {
                id:'' ,   
            },
        }
    },
    props: ({ data,ownProps}) => {
        const {patient} = ownProps;
        return {loading: data.loading, patient:patient}
    },
});

const  enhance = compose(
    withQueryEmail,
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
        return {modalTitle: 'Invite to Email'}
    }),
    withModal
);
export default enhance(InviteEmail);