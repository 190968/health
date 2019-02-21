import React from 'react';
import { Badge, Input} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import Truncate from 'react-truncate';
import  './index.less';
import { EmptyList, Loading } from '../../../../../../components/Loading';
import Avatar from '../../../../../User/components/Avatar';
const Search = Input.Search;
//
// const select = props => ({
//     filterValue: props.conversations.filterValue,
//     active: props.conversations.active,
//     conversations: props.conversations.list,
// });

// function highlight(text, highlightValue) {
//     if (!highlightValue) return text;
//     return text.replace(
//         new RegExp(`(${highlightValue})`, 'g'),
//         (str, p1) => `<span style="color: #38b8f2">${p1}</span>`
//     );
// }

const ThreadList = props => {
    const {conversations=[], currentId, loading} = props;

    if (loading) {
        return <Loading />;
    }
    if (conversations.length === 0) {
        return <EmptyList>No Conversations</EmptyList>;
    }

    return <div>
            {/* <div style={{padding:10, background: '#f2f2f2', marginBotton:5}}>
                <Search placeholder="Search" />
            </div> */}

            <div style={{marginTop:10}}>
                {conversations.map(conversation => {
                    const {lastMessage, unreadMessages=0} = conversation;
                    const {sender, sentAt, text} = lastMessage || {};
                    return <NavLink key={conversation.id} to={'/messages/'+conversation.id}>
                    <div className={"conversation " + (currentId === conversation.id ? 'active' : '')}>
                    <Avatar user={sender} />
                    <div className="conversation--details">
                        <div className="conversation--details_name"><span className="subject"><Badge count={unreadMessages} >{conversation.subject}</Badge> </span><span className="date">{moment(sentAt).fromNow()}</span></div>
                        <div className="conversation--details_text"><Truncate>{text}</Truncate></div>
                    </div>
                    </div>
                </NavLink>}
                )}

            </div>
        </div>;
}

export default  ThreadList;
/*

    render() {

        const {conversations} = this.props;

        return <div>
            <div style={{padding:10}}>
                <Search
                placeholder="Search"
            />
            </div>
            {conversations.length > 0 && conversations.map(item => {
                return  <div style={{clear:'both'}}><NavLink to={'/messages/'+item.id} style={{color:'inherit'}} >
                    <div style={{display: 'flex', height:64}}>
                        <Avatar style={{position:'absolute'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div><div>{item.subject}</div><div>{item.subject}</div></div>
                    </div>
                </NavLink></div>
            })}
            </div>
    }
 */


