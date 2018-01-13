/**
 * Created by Pavel on 11.01.2018.
 */
import React, { PropTypes } from 'react';
import { Tooltip,Form ,Carousel,Row,Col,Card,List } from 'antd';
import { withApollo, gql } from 'react-apollo'
import Slider from 'react-slick';
import { Link } from 'react-router-dom'
import '../../style.css';

let settings = {
    accessibility:true,
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
};
class MyCommynities extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
       let CarouselItem =[];

        let i=0;
        //Start huinya
        info.forEach(function(item) {
            i++;
            // if (!(i == 1 || i == 7 || i == 14)) {
            // } else {
            //     CarouselItem.push('<div className="ant-carousel" key={i}>    <Row className="ant-carousel" key={i}>');
            // }
            CarouselItem.push(


                        <Col key={i} span={4}>
                            <Link to={"/community/"+item.category.id}>
                                <Card
                                    cover={<img alt={item.category.name} height={140} src={item.category.thumb.large}/>}
                                >
                                    <Tooltip title={item.category.name}>{item.category.name.substring(0, 10)}</Tooltip></Card>
                            </Link>
                        </Col>

            )
            // if (!(i == 6 || i == 13)) {
            // } else {
            //     CarouselItem.push('  </Row></div>');
            // }
        });
        //End huinya

        return(

                <Carousel>

                        {CarouselItem}

                </Carousel>
                // <Slider>
                //     {CarouselItem}
                // </Slider>
        )
    }

}

const WrappedMyCommynities = Form.create()(MyCommynities);
export default withApollo(WrappedMyCommynities);
