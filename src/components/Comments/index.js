import React from 'react';
import {Card, Icon, Tooltip} from 'antd';
import CommentAdd from './containers/CommentAdd';
import CommentsList from './components/CommentsList';
import {compose, withState, withHandlers,defaultProps} from'recompose';
import {GET_COMMENTS_LIST} from "./queries";
import { graphql } from 'react-apollo';
import { connect } from 'react-redux'
import {withModal, withSpinnerWhileLoading} from "../Modal/index";
import { withActiveUser } from '../App/app-context';

export const CommentsPure = props => {
    const {id='', type='', user, userId='', messages=[], total=0} = props;
    return <React.Fragment>
        <CommentAdd tagId={id} tagType={type} user={user} userId={userId} />
        <CommentsList tagId={id} tagType={type} user={user} userId={userId} messages={messages} total={total} />
    </React.Fragment>;
}


const CommentsCardPure = props => {
    const {title="Discussion", ...otherProps} = props;
    //return <Card title={title+' '+(total > 0 ? '('+total+')' : '')}
    return <Card title={title} >
        <CommentsPure {...props} />
    </Card>
}

const withQuery = graphql(GET_COMMENTS_LIST, {
    options: (ownProps) => {
        //console.log(ownProps);
        return {
            variables: {
                tagId: ownProps.id,
                tagType: ownProps.type,
                //parentId: ownProps.parentId,
            },
        }
    },
    props: ({ ownProps, data }) => {
        const {loading} = data;
        let {messages=[],total=0} = ownProps;
        if (!data.loading) {
            const {edges, totalCount} = data.getComments;
            messages = edges;
            total = totalCount;
        }
        //console.log(messages);
        return {...data, loading, messages, total }
    },
});

 

const enhance = compose(
    withActiveUser,
    withQuery,
    //branch(props => props.useNumber, withQuery),
    withState('openSelect','openAttachments', false),
    //withState('viewList','setViewList', true),
    withHandlers({
        toggleAttachments: props => () => {
            props.openAttachments(!props.openSelect);
        },
        // toggleList: props => () => {
        //     //console.log(props);
        //     props.setViewList(!props.viewList);
        // }
    }),
);

export const Comments = enhance(CommentsPure);
export const CommentsCard = enhance(CommentsCardPure);
export default Comments;



const CommentsModal = compose(
    defaultProps({
        modalFooter:'close',
        modalTitle: 'Timeline Element Notes'
    }),
    withModal,
    withSpinnerWhileLoading
)(Comments);

const CommentsFromIcon = props => {
    const {viewModal=false, toggleModal, id, type} = props;
    return <React.Fragment>
        {viewModal && <CommentsModal id={id} type={type} onHide={toggleModal} title='Notes' />}
        <Tooltip title="Notes"><Icon type="message" onClick={toggleModal} /></Tooltip>
    </React.Fragment>;
}

const enhancedFromIcon = compose(
    withState('viewModal', 'setViewModal', false),
    withHandlers({
        toggleModal: props => (e) => {
            e.stopPropagation();
            props.setViewModal(!props.viewModal);
        }
    })
);

export const CommentsModalFromIcon = enhancedFromIcon(CommentsFromIcon);