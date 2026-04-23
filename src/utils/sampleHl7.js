export const sampleHl7Message = [
  'MSH|^~\\&|LabSystem|GeneralHospital|EHR|GeneralHospital|20260405103045||ORU^R01|MSG00001|P|2.5.1',
  'PID|1||P123456^^^GH^MR||Doe^Jane^A||19890417|F|||123 Cedar St^^Springfield^IL^62704||555-0172|||S||',
  'OBR|1|ORD44821|FILL0099|57021-8^Complete blood count^LN||20260405101500||||||||Dr.Nguyen||||||F',
  'OBX|1|NM|789-8^Erythrocytes^LN||4.62|10*6/uL|4.10-5.10|N|||F',
  'OBX|2|NM|718-7^Hemoglobin^LN||||g/dL|12.0-16.0|L|||F',
].join('\r')
