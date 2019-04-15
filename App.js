import React from 'react'
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native'
import { Print, FileSystem } from 'expo'
import pdfmake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default class App extends React.Component {
  state = {
    pdfData: undefined,
    onlyData: undefined,
  }

  generatePdf = () => {
    try {
      const docDefinition = {
        // userPassword: '123',
        // ownerPassword: '123456',
        // permissions: {
        //   printing: 'highResolution', //'lowResolution'
        //   modifying: false,
        //   copying: false,
        //   annotating: true,
        //   fillingForms: true,
        //   contentAccessibility: true,
        //   documentAssembly: true,
        // },
        info: {
          title: 'awesome Document',
          author: 'john doe',
          subject: 'subject of document',
          keywords: 'keywords for document',
        },
        header: 'simple text',
        footer: (currentPage, pageCount) =>
          currentPage.toString() + ' of ' + pageCount,
        watermark: {
          text: 'watermark',
          color: 'blue',
          opacity: 0.1,
          bold: true,
          italics: false,
        },
        content: [
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
          {
            text: 'google',
            link: 'http://google.com',
            style: ['line'],
            tocItem: ['mainToc', 'subToc'],
          },
          { text: 'Go to page 2', linkToPage: 2, style: ['line'] },
          { qr: 'text in QR', style: ['line'] },
          {
            qr: 'text in QR',
            foreground: 'red',
            background: 'yellow',
            style: ['line'],
          },
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
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            color: '#8CAC32',
          },
          line: {
            margin: [10, 20, 10, 20],
          },
        },
        images: {
          logo:
            'data:image/png;base64,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',
        },
      }

      const pdfDocGenerator = pdfmake.createPdf(docDefinition)
      pdfDocGenerator.getBase64(pdfData => {
        this.setState({
          pdfData: `data:application/pdf;base64,${pdfData}`,
          onlyData: pdfData,
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  print = () => {
    Print.printAsync({ uri: this.state.pdfData })
  }

  openFile = async () => {
    const uri = `${FileSystem.cacheDirectory}test.pdf`
    await FileSystem.writeAsStringAsync(uri, this.state.onlyData, {
      encoding: FileSystem.EncodingTypes.Base64,
    })

    Print.printAsync({ uri })
  }

  render() {
    const { pdfData } = this.state
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="generate" onPress={this.generatePdf} />
        {!!pdfData && <Button title="print" onPress={this.print} />}
        {!!pdfData && (
          <Button title="print from file" onPress={this.openFile} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
