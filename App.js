import React from 'react'
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native'
import { Print, FileSystem } from 'expo'

import generatePdf from './utils/generatePdf'

export default class App extends React.Component {
  state = {
    inProgress: false,
    pdfData: undefined,
    onlyData: undefined,
    bench: undefined,
  }

  generatePdf = async light => {
    try {
      const startAt = Date.now()

      this.setState({ inProgress: true })

      const { pdfData, onlyData } = await generatePdf(light)

      this.setState({
        pdfData,
        onlyData,
        inProgress: false,
        bench: Date.now() - startAt,
      })
    } catch (error) {
      console.error(error)
      this.setState({ inProgress: false })
    }
  }

  ask = () => {
    Alert.alert(
      'What do you want to do ?',
      'Generate a light or a full lines PDF',
      [
        { text: 'light', onPress: () => this.generatePdf(true) },
        { text: 'full', onPress: () => this.generatePdf(false) },
      ],
      { cancelable: false },
    )
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
    const { pdfData, inProgress, bench } = this.state
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="generate" onPress={this.ask} />
        {bench && <Text>Last generation time : {bench} ms </Text>}
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
