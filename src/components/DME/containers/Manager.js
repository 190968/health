import { prepareAttachmentsInput } from "../../FormCustomFields/components/Attachments";
import { prepareDateInput } from "../../../utils/datetime";
import { prepareEquipmentInput } from "../components/Manager/containers/EquipmentManager";


export const prepareDMEInput = values => {
    const {serviceDate, source, equipments, prescriptionType, dmePrescription} = values;
    const equipmentsInput = equipments.map(e => prepareEquipmentInput(e));
    return {serviceDate: prepareDateInput(serviceDate), source, equipments: equipmentsInput, prescriptionType,  dmePrescription: prepareAttachmentsInput(dmePrescription)};
}