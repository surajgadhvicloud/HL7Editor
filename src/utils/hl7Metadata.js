export const SEGMENT_DESCRIPTIONS = {
  MSH: 'Message Header',
  PID: 'Patient Identification',
  OBR: 'Observation Request',
  OBX: 'Observation Result',
}

export const FIELD_METADATA = {
  MSH: {
    1: 'Field Separator',
    2: 'Encoding Characters',
    3: 'Sending Application',
    4: 'Sending Facility',
    5: 'Receiving Application',
    6: 'Receiving Facility',
    7: 'Date/Time Of Message',
    9: 'Message Type',
    10: 'Message Control ID',
    11: 'Processing ID',
    12: 'Version ID',
  },
  PID: {
    1: 'Set ID - PID',
    3: 'Patient Identifier List',
    5: 'Patient Name',
    7: 'Date/Time of Birth',
    8: 'Administrative Sex',
  },
  OBR: {
    1: 'Set ID - OBR',
    2: 'Placer Order Number',
    3: 'Filler Order Number',
    4: 'Universal Service Identifier',
    5: 'Priority',
    6: 'Requested Date/Time',
    7: 'Observation Date/Time',
    8: 'Observation End Date/Time',
    9: 'Collection Volume',
    10: 'Collector Identifier',
    14: 'Specimen Received Date/Time',
    16: 'Ordering Provider',
    22: 'Results Report/Status Change Date/Time',
    25: 'Result Status',
  },
  OBX: {
    1: 'Set ID - OBX',
    2: 'Value Type',
    3: 'Observation Identifier',
    4: 'Observation Sub-ID',
    5: 'Observation Value',
    6: 'Units',
    7: 'Reference Range',
    8: 'Abnormal Flags',
    9: 'Probability',
    10: 'Nature of Abnormal Test',
    11: 'Observation Result Status',
    12: 'Effective Date of Reference Range',
    14: 'Date/Time of the Observation',
    15: 'Producer ID',
    16: 'Responsible Observer',
  },
}

export function getSegmentDescription(segmentCode) {
  return SEGMENT_DESCRIPTIONS[segmentCode] || 'Unknown Segment'
}

export function getFieldTooltip(segmentCode, fieldPosition) {
  const label = FIELD_METADATA[segmentCode]?.[fieldPosition]
  return `${segmentCode}.${fieldPosition} - ${label || 'No metadata available'}`
}
