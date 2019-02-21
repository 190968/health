import FamilyManager from '../components/FamilyManager/index';
import {graphql} from 'react-apollo';
import {compose, withStateHandlers, branch, withHandlers, withState, withProps} from 'recompose';
import {Form} from 'antd';
import {withModal, showLoadingMessage} from "../../../../../../../components/Modal/index";
import { withAddFamilyMutation, withUpdateFamilyMutation } from '../mutations';

// const GET_PROFILE = gql`
// query GET_USER_TEAM($user_id:UID) {
//     patient(id: $user_id) {
//        id
//        motivation {
//               careTeam {
//                   totalCount,
//                   edges{
//                       id,
//                       user {
//                           phoneFormatted
//                       }
//                       joinedDate
//                       roleText
//                   }
//               }
//        }
//     }
//   }
// `;

// const withQuery = graphql(GET_PROFILE, {
//     options: ({patient}) => {
//         return {
//             variables: {
//                 id: '',
//             },
//         }
//     },
//     props: ({data, ownProps}) => {
//         const {patient} = ownProps;
//         return {loading: data.loading, patient: patient}
//     },
// });

const enhance = compose(
    withProps(props => {
        const {familyMember} = props;
        const {id} = familyMember || {};
        return {isUpdate: id && id !== ''};
    }),
    branch(props => props.isUpdate, withUpdateFamilyMutation, withAddFamilyMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');

            props.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    const {communication, ...otherValues} = values;
                    const input = otherValues;
                    const hide = showLoadingMessage();

                    if (props.isUpdate) {
                        props.updateFamilyMember(input).then(({data})=> {
                            props.onHide();
                            hide();
                        });
                       
                    } else {
                        props.createFamilyMember(input).then(({data})=> {
                            props.onHide();
                            hide();
                            if (props.refetch) {
                                props.refetch();
                            }
                        });
                    }
                    
                    // props.onSubmit(values).then(({data})=> {
                    //     props.onHide();
                    // });
                }
            });
        },
    }),
    withProps(props => {
        const {isUpdate=false} = props;
        return {modalTitle: isUpdate ? 'Edit Family Member' : 'Invite Family Member'}
    }),
    withModal
);

export default enhance(FamilyManager);