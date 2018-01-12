/**
 * Created by Pavel on 11.01.2018.
 */
/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Tooltip,Form,Card,List,Row,Col ,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
import { Link } from 'react-router-dom'

class ListCommunityForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {name,categories} = this.props;


        return(
            <Card
                title={name.toUpperCase()+" COMMUNITIES"}
            >
                <Row>
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 5, xl: 5}}
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link to={"/community/"+item.id}>
                                    <Card
                                        cover={<img alt={item.name} height={120} src={item.thumb.large}/>}
                                    >
                                        <Tooltip title={item.name}>{item.name.substring(0, 10)}</Tooltip></Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Row>
            </Card>
        );
    }

}

const WrappedListCommunityForm = Form.create()(ListCommunityForm);
export default withApollo(WrappedListCommunityForm);
