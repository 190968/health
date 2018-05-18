import React from 'react';
import {Card, Icon} from 'antd';
import CommentAdd from './containers/CommentAdd';
import CommentsList from './containers/CommentsList';
import {compose, withState, withHandlers} from'recompose';

export const CommentsPure = props => {
    const {id='', type='', userId='', title="Discussion", openSelect, viewList} = props;
    return <Card title={title}
    extra={(viewList ? <Icon type="up" onClick={props.toggleList} /> : <Icon type="down"  onClick={props.toggleList} /> )}
    >
        {viewList && <React.Fragment><CommentAdd tagId={id} tagType={type} userId={userId} />
        <CommentsList tagId={id} tagType={type} userId={userId} /></React.Fragment>}
    </Card>
}
const enhance = compose(
    withState('openSelect','openAttachments', false),
    withState('viewList','setViewList', true),
    withHandlers({
        toggleAttachments: props => () => {
            props.openAttachments(!props.openSelect);
        },
        toggleList: props => () => {
            console.log(props);
            props.setViewList(!props.viewList);
        }
    }),
);

export const Comments = enhance(CommentsPure);
export default Comments;