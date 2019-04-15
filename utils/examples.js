export const columnsContent = [
  {
    columns: [
      {
        width: 'auto',
        image: 'logo',
        fit: [50, 50],
      },
      { width: '*', text: 'react-native pdf', style: ['header'] },
    ],
    style: ['line'],
  },
  {
    columns: [
      {
        width: '50%',
        text: 'inline left',
      },
      {
        width: '50%',
        text: 'inline right',
      },
    ],
    style: ['line'],
    tocItem: ['mainToc'],
  },
]

export const layout = [
  {
    layout: 'lightHorizontalLines', // optional
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 100, '*'],

      body: [
        ['First', 'Second', 'Third', 'The last one'],
        ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
        [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
      ],
    },
    style: ['line'],
  },
]

export const lists = [
  {
    text: 'Bulleted list example:',
    style: ['line'],
  },
  {
    // to treat a paragraph as a bulleted list, set an array of items under the ul key
    ul: ['Item 1', 'Item 2', 'Item 3', { text: 'Item 4', bold: true }],
  },
  {
    text: 'Numbered list example:',
    style: ['line'],
  },
  {
    // for numbered lists set the ol key
    ol: ['Item 1', 'Item 2', 'Item 3'],
  },
]

export const link = [
  {
    text: 'google',
    link: 'http://google.com',
    style: ['line'],
    tocItem: ['mainToc', 'subToc'],
  },
  { text: 'Go to page 2', linkToPage: 2, style: ['line'] },
]

export const qr = [
  { qr: 'text in QR', style: ['line'] },
  {
    qr: 'text in QR',
    foreground: 'red',
    background: 'yellow',
    style: ['line'],
  },
]

export const canvas = [
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

export const security = {
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
}
