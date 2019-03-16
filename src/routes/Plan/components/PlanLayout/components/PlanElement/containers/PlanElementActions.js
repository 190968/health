import PlanElementActions from '../components/PlanElementActions';
import { compose, branch, withState, defaultProps, withHandlers, renderComponent} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Modal, message} from 'antd';
import {PlanElementPureFragment} from "../../../../Plan/fragments";
// import PlanElementChildrenSelect from '../../../../PlanLayout/components/PlanElement/components/PlanElementChildrenList/components/PlanElementChildrenSelect/index.js';








const enhanceInner = compose(
    // withMutation,
    withState('order', 'setOrder', null),
    withState('openEditElement', 'showEditElement', false),
    defaultProps({
        buttons:[]
    }),
    withHandlers({
        toggleEditElement: props => () => {
            props.showEditElement(!props.openEditElement);
            if (!props.openEditElement) {
                props.setOrder(null);
            }
            //props.setOrder(null);
        },
        deleteElement: props => () => {
            const {deleteElement, id} = props;
            Modal.confirm({
                title: 'Do you want to delete this element?',
                onOk() {
                    deleteElement(id).then(() => {
                        message.success('Deleted');
                    });
                },
            });
        },
        addAfterElement: props => () => {
            props.setOrder(props.i+1);
        },
        addFirstElement: props => () => {
            props.setOrder(0);
        },
        addBeforeElement: props => () => {
            let i = props.i;
            if (i > 0) {
                i--;
            }
            props.setOrder(i);
        },
        hideOrder: props => () => {
            props.setOrder(null);
        },
    })
);

const enhance = compose(
    //branch(props => props.element, renderComponent(PlanElementChildrenSelect)),
    enhanceInner
)


export default enhance(PlanElementActions);
