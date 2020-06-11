module.exports = function (reportList) {
  let result = [];
  if (reportList.length > 0) {
    reportList.map(reportRow => {
     
    const {
      title,
      gender,
      phone,
      whatsapp_phone,
      contact_address,
      pha,
      dob,
      wed_date,
      marital_status,
      work_status,
      profession,
      employer_name,
      employer_address,
      state_origin,
      nationality,
      member: { firstname, middlename, lastname, email, imageUrl},
      nok: {nok_name, nok_email, nok_address, nok_phone, nok_occupation, nok_relation},
      unit_info: {group, vocal_part, rehearsal_location, membership_status, leadership_status, sub_group},
      church_info: { wsf_status, new_birth_year, holy_spirit_year, lfc_joined_year, ordination_year, province, district, zone }
     } = reportRow;

    const data = {
      firstname, lastname, middlename, email, imageUrl,
      nok_name, nok_email, nok_address, nok_phone, nok_occupation, nok_relation,
      group, vocal_part, rehearsal_location, membership_status, leadership_status, sub_group,
      wsf_status, new_birth_year, holy_spirit_year, lfc_joined_year, ordination_year, province, district, zone,
      title,
      gender,
      phone,
      whatsapp_phone,
      contact_address,
      pha,
      dob,
      wed_date,
      marital_status,
      work_status,
      profession,
      employer_name,
      employer_address,
      state_origin,
      nationality
    };
   
      result.push(data)
    });
    return JSON.stringify(result);
  } else {
    return false;
  }
}
