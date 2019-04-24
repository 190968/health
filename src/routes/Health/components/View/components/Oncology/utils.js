const OncologyTypeEnumType = {
    primary:'Primary',
    secondary:'Secondary',
}
const OncologyBehaviorEnumType = {
    benign:'Benign',
    in_situ: 'In Situ',
    malignant: 'Malignant',
    sec_malignant: 'Secondary Malignancy'
}

const OncologyDisorderEnumType = {
    neoplastic: 'Neoplastic',
    benign_hematology: 'Benign Hematology',
    benignnon_cancer_hematology: 'Non-Cancer'
}

export const formatOncologyType = type => {
    return OncologyTypeEnumType[type] || '';
}
export const formatOncologyDisorder = type => {
    return OncologyDisorderEnumType[type] || '';
}
export const formatOncologyBehavior = type => {
    return OncologyBehaviorEnumType[type] || '';
}

