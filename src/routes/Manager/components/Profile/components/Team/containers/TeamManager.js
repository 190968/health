import TeamManager from '../components/TeamManager/index';
import {graphql} from 'react-apollo';
import React from 'react';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import gql from 'graphql-tag';
import {withModal, withSpinnerWhileLoading} from "../../../../../../../components/Modal/index";
import { UserInfoFragment } from '../../../../../../User/fragments';

const GET_PATIENT_CARE_TEAM_QUERY = gql`
query GET_USER_TEAM($userId:UID) {
    patient(id: $userId) {
       id
       motivation {
              careTeam {
                  totalCount,
                  edges{
                      id,
                      user {
                          ...UserInfo
                          phoneFormatted
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
`;

const withCareTeamQuery = graphql(GET_PATIENT_CARE_TEAM_QUERY, {
    options: (ownProps) => {
        const {user} = ownProps;
        return {
            variables: {
                userId: user.id,
            },
        }
    },
    props: ({data, ownProps}) => {
        const {patient={}, management=[]} = data;
        const {motivation={}} = patient;
        const {careTeam={}} = motivation;
        const {edges=[]} = careTeam;
        const selectedItems = edges.map(item => {
            const {id, user, role} = item;
            return {id, title: user.fullName+' ('+role+')', key:id};
        });
        console.log(data, 'data');
        //
        const {getNetworkProfessionals={}} = management;
        let {edges:items=[]} = getNetworkProfessionals;
        items = items.map(item => {
            const {id, user, role} = item;
            return {id, title: user.fullName+' ('+role+')', key:id};
        })
        return {loading: data.loading, selectedItems, items}
    },
});


const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}
const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);






const enhance = compose(
    withCareTeamQuery,
   
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
        return {modalTitle: 'Manage Care Team'}
    }),
    withModal,
    withSpinnerWhileLoading,
    withState('targetKeys', 'setTargetKeys', props => props.selectedItems || []),
    withHandlers({
        handleChange: props => (nextTargetKeys, direction, moveKeys) => {

            // console.log('direction: ', direction);
            // console.log('moveKeys: ', moveKeys);
            // return {targetKeys: };

            props.setTargetKeys(nextTargetKeys);

        },

        handleSelectChange: (sourceSelectedKeys, targetSelectedKeys) => {
            console.log('sourceSelectedKeys: ', sourceSelectedKeys);
            console.log('targetSelectedKeys: ', targetSelectedKeys);
            {
                selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
            }
            ;


        }

    }),
);

export default enhance(TeamManager);