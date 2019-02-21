/**
 * Created by Pavel on 11.01.2018.
 */
import React from 'react';
import { Icon, Card } from 'antd';
import { withApollo } from 'react-apollo';

import '../../../../style.css';
import './index.less';
import CategoryCard from '../CategoryCard';
import { Carousel } from '../../../../../../components/UI/Carousel';

const MyCategories = (props) => {
	const { info, loading } = props;
	if (loading) {
		return (
			<Card loading title="My Categories">
				Loading
			</Card>
		);
	}

	// return (
	// 	<Card title={'My Communities' + ' (' + info.length + ')'} type="static">
	// 		<List
	// 			split={false}
	// 			loading={loading}
	// 			grid={{ gutter: 10, xs: 1, sm: 2, lg: 6 }}
	// 			dataSource={info}
	// 			renderItem={(item) => (
	// 				<List.Item key={item.category.id}>
	// 					<CategoryCard item={item.category} />
	// 				</List.Item>
	// 			)}
	// 		/>
	// 	</Card>
	// );
	const limit = 4;
	const slidesToShow = info.length >= limit ? limit : info.length;

	// const items = info.map((item) => <div style={{padding:5}}><CategoryCard key={item.category.id} item={item.category} /></div>);
	const items = info.map((item) => <div key={item.category.id} ><div style={{padding:5}}><CategoryCard item={item.category} /></div></div>);
	return (
		<Card  title={'My Communities' + ' (' + info.length + ')'}>
			<Carousel items={items} slidesToShow={slidesToShow} />
		</Card>
	);
};

export default withApollo(MyCategories);
