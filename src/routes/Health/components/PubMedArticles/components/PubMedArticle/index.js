import React from 'react';
import {Table, Button} from 'antd';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import Description from '../../../../../../components/Layout/DescriptionList/Description';
import './index.less';
const PubMedArticle = props => {
    const {loading, article} = props;
    const {id, title, volume, abstractText, pubYear, journalTitle, ISSN} = article;


    const descriptionDetails = [
        //['Name', user.fullName],
        ['PUBMED ID', id],
        ['Title', title],
        
        ['Abstract', abstractText],
        ['Publication Year', pubYear],
        ['ISSN', ISSN],
        ['Volume', volume],
        ['Journal Title', journalTitle],
    ];

 
                    



    return <div className={'pubmed-article'}><DescriptionList col={1} >
    {descriptionDetails.map((details, i) => {
        return  <Description key={i} term={details[0]} excludeEmpty >
            {details[1]}
        </Description>;
    })}
</DescriptionList></div>
}

export default PubMedArticle;