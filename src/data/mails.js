// this is a temp mail data, to simulate the json that UI might be receive from server.
const mailList = [
  {
    sender: 'aaa@example.com',
    recipient: ['zzz.zzz@example.com'],
    timestamp: '3/5/2020 00:20:00',
    title: '[ HR - 888 ] Notice of official announcement',
    body: 'Quisque et lacus vel sapien ornare aliquam ut eu ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sollicitudin lorem ac nibh elementum sagittis. Aliquam tincidunt leo id ligula eleifend vulputate. Vivamus aliquet risus dignissim risus vehicula, in porta nibh aliquet. Maecenas et ligula sit amet nibh egestas consectetur. Pellentesque posuere risus tellus. Sed vel ipsum in massa facilisis dignissim. Fusce ac mi eu metus feugiat ultricies. Quisque fringilla mauris id lacinia tristique. Curabitur ut felis viverra, efficitur enim vel, sodales nisi. Praesent a ex bibendum, volutpat ligula a, vulputate felis. Phasellus diam eros, placerat quis posuere semper, ultricies sagittis ante. Vestibulum eu mi risus.',
    hasAttachment: false,
  },
  {
    sender: 'bbb.bbbb@example.com',
    recipient: ['yyy@example.com'],
    timestamp: '3/5/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis diam at aliquet mattis. Maecenas eleifend egestas interdum. Sed vulputate elementum sapien, sed euismod urna euismod sit amet. Suspendisse efficitur magna nec orci tempus, quis interdum lectus commodo. Integer tristique magna quis mollis accumsan. Duis ut mattis ligula, a vestibulum nulla. Donec commodo pretium vulputate. Fusce viverra ligula ligula, et consectetur turpis bibendum et. Proin sodales nec ipsum id imperdiet. Duis et neque nec elit pharetra iaculis et et mi. Vivamus at neque nisl. Phasellus maximus lectus a placerat tincidunt. In ut ultrices orci. Cras convallis, nisl quis mollis sagittis, tellus tortor mollis magna, vitae tempus tortor odio vitae orci. Vivamus a fermentum nibh, id congue enim. Morbi vel commodo ipsum.',
    hasAttachment: false,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com'],
    timestamp: '1/1/2020 00:00:00',
    title: 'Happy New Year! Greetings for the New Year.',
    body: 'あけましておめでとうございます。今年もよろしくお願いします。',
    hasAttachment: true,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com', 'www.www@example.com', 'www.www@example.com'],
    timestamp: '1/1/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    body: 'Vestibulum eleifend ipsum at nisl sollicitudin vulputate. Morbi erat nisi, egestas rutrum condimentum in, accumsan tristique odio. Fusce lectus neque, lobortis a quam non, dignissim auctor turpis. Fusce consectetur egestas purus, a euismod turpis vulputate vitae. Etiam vel convallis enim. Donec fermentum, odio ut gravida gravida, risus magna sodales augue, et consectetur libero leo in sapien. Nulla in fermentum mi.',
    hasAttachment: true,
  },
  {
    sender: 'aaa@example.com',
    recipient: ['zzz.zzz@example.com'],
    timestamp: '3/5/2021 00:20:00',
    title: '[ HR - 888 ] Notice of official announcement',
    body: 'Quisque et lacus vel sapien ornare aliquam ut eu ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sollicitudin lorem ac nibh elementum sagittis. Aliquam tincidunt leo id ligula eleifend vulputate. Vivamus aliquet risus dignissim risus vehicula, in porta nibh aliquet. Maecenas et ligula sit amet nibh egestas consectetur. Pellentesque posuere risus tellus. Sed vel ipsum in massa facilisis dignissim. Fusce ac mi eu metus feugiat ultricies. Quisque fringilla mauris id lacinia tristique. Curabitur ut felis viverra, efficitur enim vel, sodales nisi. Praesent a ex bibendum, volutpat ligula a, vulputate felis. Phasellus diam eros, placerat quis posuere semper, ultricies sagittis ante. Vestibulum eu mi risus.',
    hasAttachment: false,
  },
  {
    sender: 'bbb.bbbb@example.com',
    recipient: ['yyy@example.com'],
    timestamp: '3/5/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    body: 'In hac habitasse platea dictumst. Nulla facilisi. Maecenas mollis nisi et sem tincidunt ornare. Sed eget congue lacus. Cras ac lorem quis turpis volutpat faucibus. Maecenas ac mauris laoreet mi ornare volutpat eu et diam. In efficitur nec sem sit amet commodo. Quisque pretium, enim imperdiet cursus sagittis, turpis turpis lobortis turpis, at pellentesque magna diam vitae tellus. Donec eget cursus magna. Ut a suscipit dui. Phasellus tincidunt egestas ipsum vel luctus.',
    hasAttachment: false,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com'],
    timestamp: '3/5/2021 00:00:00',
    title: 'Happy New Year! Greetings for the New Year.',
    body: 'あけましておめでとうございます。今年もよろしくお願いします。',
    hasAttachment: true,
  },
  {
    sender: 'ccc@example.com',
    recipient: ['xxx@example.com', 'www.www@example.com', 'www.www@example.com', 'www.www@example.com'],
    timestamp: '1/1/2021 00:10:00',
    title: '[web:333] "Web Contact"',
    body: 'Maecenas consectetur sed purus nec volutpat. Donec at dictum dolor. Vivamus bibendum lacinia erat eu congue. Fusce viverra ultrices quam, et sollicitudin nunc tincidunt in. Mauris egestas velit vitae velit iaculis pretium. Praesent non porttitor felis. Ut euismod accumsan lobortis. Maecenas ultricies turpis vitae vestibulum laoreet. Quisque sed sodales ante, id gravida nunc. Cras lobortis elit sed faucibus sollicitudin.',
    hasAttachment: false,
  },
];

export default mailList;
