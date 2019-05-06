import {message} from 'antd';
import Pricing from '../components/Pricing';
import Privacy from '../components/Privacy';
import Disclaimer from '../components/Disclaimer';
import Language from '../components/Language';
import Icd10Codes from '../components/Icd10Codes';
import Tags from '../components/Tags';
import Outcome from '../components/Outcome';
import Advanced from '../components/Advanced';
import Category from '../components/Category';
import Location from '../components/Location';
import Gender from '../components/Gender';
import Ribbons from '../components/Ribbons';
import {Form} from 'antd';
import { compose, branch, renderComponent, withHandlers } from 'recompose';
import { prepareDateInput } from '../../../../../../../utils/datetime';
import { prepareAddressInput } from '../../../../../../../components/FormCustomFields/components/Address';

const enhance = compose(
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form, type } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareBuilderApOptionsInput(values, type);
                    
                    props.updateDetails(input, type).then(() => {
                        message.success('Updated');
                        if (props.onHide) {
                            props.onHide();
                        }
                         if (props.refetch) {
                             props.refetch();
                         }   
                    });
                }
            });
        }
    }),
    branch(({type}) => type === 'category', renderComponent(Category)),
    branch(({type}) => type === 'privacy', renderComponent(Privacy)),
    branch(({type}) => type === 'disclaimer', renderComponent(Disclaimer)),
    branch(({type}) => type === 'language', renderComponent(Language)),
    branch(({type}) => type === 'location', renderComponent(Location)),
    branch(({type}) => type === 'icd10Codes', renderComponent(Icd10Codes)),
    branch(({type}) => type === 'tags', renderComponent(Tags)),
    branch(({type}) => type === 'outcome', renderComponent(Outcome)),
    branch(({type}) => type === 'advanced', renderComponent(Advanced)),
    branch(({type}) => type === 'gender', renderComponent(Gender)),
    branch(({type}) => type === 'ribbons', renderComponent(Ribbons)),
);
export const BuildOptionsContent = enhance(Pricing);


const prepareBuilderApOptionsInput = (values, type) => {
    let input = {};
    console.log(type);
    console.log(values);
    switch(type) {
        case 'category':
            const {categories=[]} = values;
            input.categoryIds = categories.map(c=>c.id);
            break;
        case 'privacy':
            const {privacy, visibility} = values;
            input = {privacy, visibility};
            break;
        case 'pricing':
            let {isPaid, price, hasPromoPrice, pricePromo, promoStartDate, promoEndDate} = values;
            if (!isPaid) {
                price = 0;
            }
            if (!hasPromoPrice) {
                pricePromo = null;
                promoStartDate = null;
                promoEndDate = null;
            }
            input = {price, pricePromo, promoStartDate: prepareDateInput(promoStartDate), promoEndDate: prepareDateInput(promoEndDate)};
            break;
        case 'disclaimer':
            let {useDisclaimer, disclaimer, consentIsRequired} = values;
            if (!useDisclaimer) {
                disclaimer = null;
                consentIsRequired = null;
            }
            input = {disclaimer, consentIsRequired}
            break;
        case 'location':
            const {location} = values;
            input = {location: prepareAddressInput(location)}
            break;
        case 'gender':
            let {gender, useMinAge, minAge, useMaxAge, maxAge, adultsOnly} = values;
            if (!useMinAge) {
                minAge = null;
            }
            if (!useMaxAge) {
                maxAge = null;
            }
            input = {gender, minAge, maxAge, adultsOnly}
            break;
        case 'language':
            const {languageId} = values;
            input = {languageId}
            break;
        case 'ribbons':
            const {ribbonId} = values;
            input = {ribbonId: ribbonId}
            break;
        case 'tags':
            const {tags} = values;
            input = {tags}
            break;
        case 'outcome':
            const {outcome} = values;
            input = {outcome}
            break;
        case 'advanced':
            const {source, audience, associatedPlans, requirements, levels} = values;
            input = {source, audience, associatedPlans:associatedPlans.map(p=>p.id), requirements, levels}
            break;
        case 'icd10Codes':
            const {icd10Codes} = values;
            input = {icd10Codes: icd10Codes.map(c=>c.id)};
            break;
    }

    return input;
}