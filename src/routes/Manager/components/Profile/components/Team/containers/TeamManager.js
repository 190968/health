import TeamManager from '../components/TeamManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal, withSpinnerWhileLoading, withDrawer} from "../../../../../../../components/Modal/index";
import { UserInfoFragment } from '../../../../../../User/fragments';
import {withUpdateCareTeamMutation} from '../mutations';
import { PhoneInfoFragment } from '../../../../../../../components/FormCustomFields/components/Phone/fragments';

const GET_PATIENT_CARE_TEAM_QUERY = gql`
query GET_USER_TEAM($userId:UID) {
    patient(id: $userId) {
       id
       motivation {
              careTeam {
                  totalCount,
                  edges{
                      id,
                      objectId,
                      user {
                          ...UserInfo
                          phone {
                              ...PhoneInfo
                          }
                      }
                      joinedDate
                      roleText
                  }
              }
       }
    }

    management {
        getNetworkProfessionals {
            edges {
                id
                role
                roleTitle
                user {
                    ...UserInfo
                }
            }
        }
    }
  }
  ${UserInfoFragment}
  ${PhoneInfoFragment}
`;

const withCareTeamQuery = graphql(GET_PATIENT_CARE_TEAM_QUERY, {
    options: (ownProps) => {
        const {user} = ownProps;
        //console.log(11111);
        return {
            variables: {
                userId: user.id,
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({data, ownProps}) => {
        const {patient, management} = data;
        const {motivation} = patient || {};
        const {careTeam} = motivation || {};
        const {edges=[]} = careTeam || {};


        // const selectedItems = edges.map(item => {
        //     const {id, user, role} = item;
        //     return {id, title: user.fullName+' ('+role+')', key:id};
        // });
        // console.log(data, 'data');
        // //
        const {getNetworkProfessionals} = management || {};
        let {edges:items=[]} = getNetworkProfessionals || {};
        const existingItems = [];
        items = items.map(item => {
            const {id,user, roleTitle} = item;
            // check if exists
            existingItems.push(id);
            return {id:id, title: user.fullName, description:roleTitle, key:id}; 
        });
        // add team members as well
        const newItems = edges.filter(user => !existingItems.includes(user.objectId));
        console.log(newItems, 'newItems');
        newItems.map(item => {
            const {user, objectId, roleText} = item;
            items.push({id:objectId, title: user.fullName, description:roleText, key:objectId})
            return null;
        })
        return {loading: data.loading, teamMembers:edges, items}
    },
});



const enhance = compose(
    withCareTeamQuery,
    withUpdateCareTeamMutation,
    withSpinnerWhileLoading,
    withState('targetKeys', 'setTargetKeys', props => {
        //console.log(props);
        const {teamMembers=[]} = props;
        //console.log(teamMembers.map(user => user.user.id));
        return teamMembers.map(user => user.objectId);
    }),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            const {targetKeys:ids} = props;
            props.updateCareTeam(ids).then(() => {
                props.onHide();
            })
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
        return {modalTitle: 'Manage Care Team'}
    }),
    withDrawer,
    
    withHandlers({
        handleChange: props => (nextTargetKeys, direction, moveKeys) => {
            props.setTargetKeys(nextTargetKeys);
        },
        handleSelectChange: (sourceSelectedKeys, targetSelectedKeys) => {
            // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
            // console.log('targetSelectedKeys: ', targetSelectedKeys);
            // {
            //     selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
            // }
            // ;
        }
    }),
);

export default enhance(TeamManager);