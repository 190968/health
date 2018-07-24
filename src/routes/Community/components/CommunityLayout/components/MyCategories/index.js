/**
 * Created by Pavel on 11.01.2018.
 */
import React from 'react';
import { Form, Card, List, Carousel } from 'antd';
import { withApollo } from 'react-apollo';

import '../../../../style.css';
import CategoryCard from '../CategoryCard';

const MyCategories = (props) => {
	const { info, loading } = props;
	if (loading) {
		return (
			<Card loading title="My Categories">
				Loading
			</Card>
		);
	}

	return (
		<Card title={'My Communities' + ' (' + info.length + ')'} type="static">
			<List
				split={false}
				loading={loading}
				grid={{ gutter: 10, xs: 1, sm: 2, lg: 6 }}
				dataSource={info}
				renderItem={(item) => (
					<List.Item key={item.category.id}>
						<CategoryCard item={item.category} />
					</List.Item>
				)}
			/>
		</Card>
	);
	const limit = 3;
	const slidesToShow = info.length >= limit ? limit : info.length;

	const items = info.map((item) => <CategoryCard key={item.category.id} item={item.category} />);
	return (
		<Card title={'My Communities' + ' (' + info.length + ')'}>
			<Carousel
				slidesToShow={slidesToShow}
				arrows={true}
				centerPadding={20}
				slidesToScroll={6}
				responsive={[ { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } } ]}
			>
				{items}
			</Carousel>
		</Card>
	);
};

//const WrappedMyCategories = Form.create()();
export default withApollo(MyCategories);
