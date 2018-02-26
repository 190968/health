/**
 * Created by Pavel on 11.01.2018.
 */
import React, { PropTypes } from 'react';
import { Tooltip,Form ,Carousel,Row,Col,Card,List } from 'antd';
import { withApollo, gql } from 'react-apollo'
import Slider from 'react-slick';
import { Link } from 'react-router-dom'
import '../../../../style.css';
import messages from "../MainCategories/messages";
import CategoryCard from '../CategoryCard';

let settings = {
    accessibility:true,
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
};
class MyCategories extends React.Component{




    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <Card loading title="My Categories">Loading!!!</Card>
            );
        }
        /*let CarouselItem =[];

        let i=0;
        info.forEach(function(item) {
            i++;
            CarouselItem.push(
                            <Link key={item.category.id} to={"/community/"+item.category.id} >
                                <Card style={{ margin:5}}
                                    cover={<img alt={item.category.name} height={140} src={item.category.thumb.large}/>}
                                >
                                    <Tooltip title={item.category.name}>{item.category.name.substring(0, 10)}</Tooltip></Card>
                            </Link>

            )

        });*/




        return(
            <Card
                title="My Communities"
            >
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 2,  lg: 4}}
                    dataSource={info}
                    renderItem={item => (
                        <List.Item key={item.category.id}>
                            <CategoryCard item={item.category} />
                        </List.Item>
                    )}
                />

            </Card>
        )
        /*return(
            <Card title="My Categories">
                <Carousel slidesToShow={6} arrows={true} centerPadding={20} slidesToScroll={6} responsive={[{ breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll:3 }}]}>

                        {CarouselItem}

                </Carousel>
            </Card>
        )*/
    }

}

const WrappedMyCategories = Form.create()(MyCategories);
export default withApollo(WrappedMyCategories);
