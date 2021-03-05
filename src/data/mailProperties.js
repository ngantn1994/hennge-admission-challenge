// this is the file to store the json properties, to support different json properties name
// just need to replace the object in mails.js with the json object,
// and change the properties's name in here.
const properties = {
  SENDER: 'sender',
  RECIPIENT: 'recipient',
  TIMESTAMP: 'timestamp',
  TITLE: 'title',
  BODY: 'body',
  HAS_ATTACHMENT: 'hasAttachment',
};

export default properties;
