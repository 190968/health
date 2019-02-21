import React from 'react';
import { getRequestAnimationFrame, easeInOutCubic } from '../../../../../../utils/animate';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import './index.less';
import Avatar from '../../../../../User/components/Avatar';
const reqAnimFrame = getRequestAnimationFrame();

class ChatPresent extends React.Component {

    static defaultProps = {
        messages: []
    }
    // scrollToTop = () => {
    //     return this.scrollView && this.scrollView.scrollComponent.parentElement.scroll(0, 50);
    // }

    componentDidMount() {
       const container = this.container;
       const goToPrevScroll = this.goToPrevScroll;
        function func() {
            const targetScrollTop = container.scrollHeight;
            //console.log(targetScrollTop, 'targetScrollTop');
            // alert( 'Привет' );
            // console.log(targetScrollTop, 'lll');
            // goToPrevScroll(targetScrollTop);
            container.scrollTop = targetScrollTop;
          }
          
        setTimeout(func, 2000);
        console.log( 'targetScrollTopcomponentDidMount');
        //
        //this.scrollIntoView();
        // add scroll
        //window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate() {
        // this.scrollIntoView();
        const targetScrollTop = this.container.scrollHeight;
        console.log(targetScrollTop, 'targetScrollTopcomponentDidUpdate');
        this.goToPrevScroll(targetScrollTop);
    }
    // componentWillUnmount() {
    //     // remove scroll
    //     //window.removeEventListener('scroll', this.handleScroll);
    // }
    // /*handleScroll = (event) => {
    //     let scrollTop = event.srcElement.body.scrollTop,
    //         itemTranslate = Math.min(0, scrollTop/3 - 60);


    // }*/
    // scrollIntoView = () => {
    //     if (this.props.loading) { return; }
    //     if (!this.container) { return; }
    //     const container = this.container;
    //     const startTime = Date.now();
    //     const scrollTop = container.scrollTop;
    //     const targetScrollTop = container.scrollHeight;

    //     // check if we scroll top

    //     const frameFunc = () => {
    //         const timestamp = Date.now();
    //         const time = timestamp - startTime;
    //         container.scrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
    //         if (time < 450) {
    //             reqAnimFrame(frameFunc);
    //         }
    //     };
    //     reqAnimFrame(frameFunc);
    // }
    goToPrevScroll = (oldScrollHeight) => {
        const list = this.container;
        // console.log(list.scrollHeight - oldScrollHeight + list.scrollTop);
        // console.log(oldScrollHeight);
        // console.log(list.scrollTop);
        // console.log(list.scrollHeight);
        list.scrollTop = list.scrollHeight - oldScrollHeight + list.scrollTop;
    }

    loadItems = (page) => {
        console.log('scroll')
        if (this.props.loading) {
            return true;
        }
        console.log('scroll START')
        const targetScrollTop = this.container.scrollHeight;
        this.props.loadMore().then((props) => {
            console.log(targetScrollTop);
            this.goToPrevScroll(targetScrollTop);
        });
        //this.scrollIntoView();
       // this.scrollToTop();
    }

    render() {
        const { loading, messages, currentUser, hasMore } = this.props;

        if (loading) {
            // return <Card  bordered={false} loading>Loading...</Card>
        }


        return (<div
            ref={c => { this.container = c; }}
            className={'chatPresent'}
        >
            <InfiniteScroll
                initialLoad={false}
                // pageStart={0}
                isReverse={true}
                threshold={40}
                loadMore={this.loadItems}
                hasMore={!loading && hasMore}
                useWindow={false}
                // ref={ref => this.scrollView = ref}
            >
                {messages.map((conversation, idx) => {
                    const {sender} = conversation;
                    const {id:senderId} = sender || {};

                    const isMe = senderId === currentUser.id;
                    const from = isMe ? 'me' : sender.fullName;

                    return (<div key={`present-${idx}`} className={isMe ? 'me' : 'chatMessage'}>
                        {!isMe ? <span  style={{ float: 'left' }}><Avatar user={sender} /></span> : null}

                        <span className={'meta'}>

                            {/* {!isMe && <span className={'userName'}>
                                {from}
                            </span>} */}

                            <span className={'time'}>
                                {moment(conversation.sentAt).format('lll')}
                            </span>

                        </span>

                        <div className={'bubble'}>
                            <span dangerouslySetInnerHTML={{ __html: conversation.text }} />
                        </div>
                    </div>);


                })}
            </InfiniteScroll>
        </div>);
    }
}

export default ChatPresent