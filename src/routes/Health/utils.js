




export const HEALTH_ELEMENTS = [
    { type: 'allergy', label: 'Allergy' },
    { type: 'med_allergy', label: 'Med. Allergy' },
    { type: 'diagnosis', label: 'Diagnosis' },
    { type: 'radiology', label: 'Radiology' },
    { type: 'radiation', label: 'Radiation' },
    { type: 'pathology', label: 'Pathology' },
    { type: 'oncology', label: 'Oncology' },
    { type: 'treatment', label: 'Treatment' },
    { type: 'clinical_trial', label: 'Clinical Trial' },
    { type: 'chemotherapy', label: 'Chemotherapy' },
]

export const HEALTH_TREATMENT_ELEMENTS = [
    { type: 'chemotherapy', label: 'Chemotherapy' },
    { type: 'clinical_trial', label: 'Clinical Trial', disabled: true },
    { type: 'medication', label: 'Generic drug', disabled: true },
    { type: 'oncology', label: 'Oncology' },
    { type: 'radiation', label: 'Radiation therapy' },
    { type: 'radiology', label: 'Imaging/Radiology' },
    { type: 'pathology', label: 'Pathology' },
    { type: 'radiotherapy', label: 'Radiotherapy', disabled: true },
    { type: 'surgery_reconstruction', label: 'Surgery: reconstruction', disabled: true },
    { type: 'surgical_excision', label: 'Surgical excision', disabled: true },
    { type: 'surgical_resection', label: 'Surgical resection', disabled: true },
    { type: 'surgical_dissection', label: 'Surgical dissection', disabled: true },
    { type: 'intr_chemotherapy', label: 'Intravesical chemotherapy', disabled: true },
    { type: 'biopsy', label: 'Biopsy', disabled: true },
    { type: 'hormone_therapy', label: 'Hormone/endocrine therapy', disabled: true },
    { type: 'chemoradiotherapy', label: 'Chemoradiotherapy', disabled: true },
    { type: 'outpatient_procedure', label: 'Outpatient procedure', disabled: true },
    { type: 'extended_curettage', label: 'Extended curettage', disabled: true },
    { type: 'metastasectomy', label: 'Metastasectomy', disabled: true },
    { type: 'irradiation_therapy', label: 'Irradiation therapy', disabled: true },
    { type: 'chemotherapeutic_agents', label: 'Chemotherapeutic agents', disabled: true },
    { type: 'targeted_therapy', label: 'Targeted therapy', disabled: true },
    { type: 'ablation_therapy', label: 'Ablation therapy', disabled: true },
    { type: 'suppressive_therapy', label: 'Suppressive therapy', disabled: true },
]

 

export const getHealthElementLabel = (element) => {
    const mainElements = HEALTH_ELEMENTS;
    //console.log(element, 'element');
    const labels = mainElements.filter(mainElement => {
        if (mainElement.type === element.type) {
            return mainElement['label'];
        }
    })
    if (labels.length > 0) {
        return labels[0]['label'];
    }
    return '';

}