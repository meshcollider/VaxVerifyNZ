import React from 'react'
import { Text, Button, Alert } from 'react-native'

export default class ShowQRButton extends React.Component {
    onPress() {
        data = this.props.data
        Alert.alert('QR code data:', data)
    }

    render() {
        return <Button title="Show QR Data" onPress={this.onPress.bind(this)} />
    }
}
