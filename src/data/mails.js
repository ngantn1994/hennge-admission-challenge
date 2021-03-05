// this is a temp mail data, to simulate the json that UI might be receive from server.
const mailList = [
  {
    sender: 'aaa@example.com',
    recipient: ['zzz.zzz@example.com'],
    timestamp: '3/5/2021 00:20:00',
    title: '[ HR - 888 ] Notice of official announcement',
    content: 'test content',
    hasAttachment: false,
  },
  {
    sender: 'bbb.bbbb@example.com',
    recipient: ['yyy@example.com'],
    timestamp: '3/5/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    content: 'test content',
    hasAttachment: false,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com'],
    timestamp: '3/5/2021 00:00:00',
    title: 'Happy New Year! Greetings for the New Year.',
    content: 'test content',
    hasAttachment: true,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com', 'www.www@example.com', 'www.www@example.com'],
    timestamp: '1/1/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    content: 'test content',
    hasAttachment: false,
  },
];

export default mailList;
