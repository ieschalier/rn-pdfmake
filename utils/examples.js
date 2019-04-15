import faker from 'faker'

export const columnsContent = () => [
  {
    columns: [
      {
        width: 'auto',
        image: 'logo',
        fit: [50, 50],
      },
      { width: '*', text: faker.company.companyName(), style: ['header'] },
    ],
    style: ['line'],
  },
  {
    columns: [
      {
        width: '50%',
        text: faker.commerce.department(),
      },
      {
        width: '50%',
        text: faker.commerce.department(),
      },
    ],
    style: ['line'],
    tocItem: ['mainToc'],
  },
]

export const layout = light => [
  {
    layout: 'lightHorizontalLines', // optional
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 100, '*'],

      body: [
        ['department', 'productName', 'color', 'price'],
        ...[...new Array(light ? 2 : 200)].map(() => [
          { text: faker.commerce.department(), bold: true },
          faker.commerce.productName(),
          faker.commerce.color(),
          faker.commerce.price(),
        ]),
      ],
    },
    style: ['line'],
  },
]

export const lists = light => [
  {
    text: 'Emails',
    style: ['line'],
  },
  {
    // to treat a paragraph as a bulleted list, set an array of items under the ul key
    ul: [...new Array(light ? 2 : 200)].map(faker.internet.email),
  },
  {
    text: 'Users :',
    style: ['line'],
  },
  {
    // for numbered lists set the ol key
    ol: [...new Array(light ? 2 : 200)].map(faker.name.findName),
  },
]

export const link = () => [
  {
    text: 'google',
    link: 'http://google.com',
    style: ['line'],
    tocItem: ['mainToc', 'subToc'],
  },
  { text: 'Go to page 2', linkToPage: 2, style: ['line'] },
]

export const qr = () => [
  { qr: 'text in QR', style: ['line'] },
  {
    qr: 'text in QR',
    foreground: 'red',
    background: 'yellow',
    style: ['line'],
  },
]

export const canvas = () => [
  {
    width: 'auto',
    image: 'logo',
    width: 310,
    height: 310,
    pageSize: 'A5',
    pageOrientation: 'landscape',
    pageBreak: 'before',
  },
  {
    canvas: [
      {
        type: 'rect',
        x: 20,
        y: 20,
        w: 270,
        h: 270,
        r: 5,
        dash: { length: 5 },
        lineColor: 'blue',
      },
    ],
    margin: [0, -310, 0, 0],
  },
]

export const security = () => ({
  userPassword: '123',
  ownerPassword: '123456',
  permissions: {
    printing: 'highResolution', //'lowResolution'
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true,
  },
})
