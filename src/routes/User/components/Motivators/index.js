/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Form,  List, Card,Modal,Input,Button, Tooltip, Icon } from 'antd';
import AvatarWithName from '../AvatarWithName';
import {
    FormattedMessage,
} from 'react-intl';
import messages from './i18n/en';
import { ListWithMessage } from '../../../../components/UI/List';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

class Motivators extends React.Component {
    state = { visible: false }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values, this.handleCancel);
        });
    }

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        this.props.loadMore(this.props.endCursor, this.stopLoading);
    }

    render() {

        const  {loading,hasMore} = this.props;
 
        const  {motivators, totalCount=0} = this.props;
    return(
        <Card loading={loading} title={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.myMotivators} />}>
                 <ListWithMessage
                    emptyMessage={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.noMotivators} />}
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={motivators}
                    renderItem={person => (
                        <List.Item key={person.id}>
                               <AvatarWithName user={{...person.user, email:person.email}} truncate role={'motivator'} />
                        </List.Item>
                    )}
                     />
                </Card>


        )
    }
}

const WrappedMotivators= Motivators;
export default WrappedMotivators;