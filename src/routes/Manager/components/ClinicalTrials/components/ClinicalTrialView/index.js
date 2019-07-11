import React from 'react';
import DescriptionList from "../../../../../../components/Layout/DescriptionList";



export  const ClinicalTrialViewPure = props =>{
    const { clinicalTrial} = props;
    const { nctId,briefSummary, cbComment, cbMeshTerm, condition, criteria,
        gender, facilityName, detailedDescription, hasExpandedAccess,
        healthyVolunteers, ibComment, ibMeshTerm, id, internationalName, internationalType, key,
        lastUpdatePosted, lastUpdateSubmitted, lastUpdateSubmittedQc, locationCountries, maxAge,
        minAge,  originStydId, phase, secondaryId, source, sponsorAgency, 
        sponsorAgencyClass, status, studyFirstPosted, studyFirstSubmitted, studyFirstSubmittedQc,
        studyInterntionModel, studyMasking,studyPrimaryPurpose, studyType, title, verificationDate  } = clinicalTrial || {};
    let details = [
        ['Name', nctId],
        ['Brief Summary', briefSummary],
        ['Cb Comment', cbComment],
        ['Cb Mesh Term', cbMeshTerm],
        ['Condition', condition],
        ['Criteria', criteria],
        ['Detalied Description', detailedDescription],
        ['Facility Name', facilityName],
        ['Gender', gender],
        ['Has Expanded Access', hasExpandedAccess],
        ['Healthy Volunteers', healthyVolunteers],
        ['Ib Comment', ibComment],
        ['Id', id],
        ['Ib Mesh Term', ibMeshTerm],
        ['International Name', internationalName],
        ['International Type', internationalType],
        ['Key', key],
        ['Last Updata Posted', lastUpdatePosted],
        ['Last Update Submitted', lastUpdateSubmitted],
        ['Last Update Submited Qc', lastUpdateSubmittedQc],
        ['Location Countries',locationCountries],
        ['Max Age', maxAge],
        ['Min Age', minAge],
        ['Sponsor Agency', sponsorAgency],
        ['Origin Styd Id', originStydId],
        ['Phase', phase],
        ['Secondary Id', secondaryId],
        ['Source', source],
        ['Sponsor Agency Class', sponsorAgencyClass],
        ['Status', status],
        ['Study First Posted', studyFirstPosted],
        ['Study First Submited', studyFirstSubmitted],
        ['Study First Submited Qc', studyFirstSubmittedQc],
        ['Study Intervention Model', studyInterntionModel],
        ['Study Masking', studyMasking],
        ['Study Primary Purpose', studyPrimaryPurpose],
        ['Study Type', studyType],
        ['Title', title],
        ['Verification Data', verificationDate],
        //['Created', createdOn && moment(createdOn).format('lll')],
    ]
   
    /*
    address: "{"city":"Charleston","state":"South Carolina","country":"United States"}"
briefSummary: " This study will test the ability of extended release nifedipine (Procardia XL), a blood pressure medication, to permit a decrease in the dose of glucocorticoid medication children take to treat congenital adrenal hyperplasia (CAH). "
cbComment: null
cbMeshTerm: null
condition: "Congenital Adrenal Hyperplasia"
criteria: " Inclusion Criteria: - diagnosed with Congenital Adrenal Hyperplasia (CAH) - normal ECG during baseline evaluation Exclusion Criteria: - history of liver disease, or elevated liver function tests - history of cardiovascular disease "
detailedDescription: " This protocol is designed to assess both acute and chronic effects of the calcium channel antagonist, nifedipine, on the hypothalamic-pituitary-adrenal axis in patients with congenital adrenal hyperplasia. The multicenter trial is composed of two phases and will involve a double-blind, placebo-controlled parallel design. The goal of Phase I is to examine the ability of nifedipine vs. placebo to decrease adrenocorticotropic hormone (ACTH) levels, as well as to begin to assess the dose-dependency of nifedipine effects. The goal of Phase II is to evaluate the long-term effects of nifedipine; that is, can attenuation of ACTH release by nifedipine permit a decrease in the dosage of glucocorticoid needed to suppress the HPA axis? Such a decrease would, in turn, reduce the deleterious effects of glucocorticoid treatment in CAH. "
facilityName: "Medical University of South Carolina"
gender: "All"
hasExpandedAccess: "No"
healthyVolunteers: true
ibComment: null
ibMeshTerm: "Nifedipine"
id: "a1"
interventionName: "Nifedipine"
interventionType: "Drug"
key: 0
lastUpdatePosted: "2005-06-24"
lastUpdateSubmitted: "2005-06-23"
lastUpdateSubmittedQc: "2005-06-23"
locationCountries: "United States"
maxAge: "35 Years"
minAge: "14 Years"
nctId: "NCT00000102"
orgStudyId: "NCRR-M01RR01070-0506"
phase: "Phase 1/Phase 2"
secondaryId: "M01RR001070"
source: "National Center for Research Resources (NCRR)"
sponsorAgency: "National Center for Research Resources (NCRR)"
sponsorAgencyClass: "NIH"
status: "Completed"
studyFirstPosted: "1999-11-04"
studyFirstSubmitted: "1999-11-03"
studyFirstSubmittedQc: "1999-11-03"
studyInterventionModel: "Parallel Assignment"
studyMasking: "Double"
studyPrimaryPurpose: "Treatment"
studyType: "Interventional"
title: "Congenital Adrenal Hyperplasia: Calcium Channels as Therapeutic Targets"
verificationDate: "2004-01-01"
    */
    return <DescriptionList col={1} details={details}/>
}