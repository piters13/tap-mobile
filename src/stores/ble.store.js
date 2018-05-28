import { BleManager } from 'react-native-ble-plx'
import { action, observable } from 'mobx'

const base64 = require('base-64')

export const ConnectionState = {
  Connected: 'connected',
  Disconnected: 'disconnected'
}

export class BleStore {
  @observable bleManager = new BleManager()
  @observable device = null
  @observable state = ConnectionState.Disconnected
  @observable clickSubscription = null
  @observable pingSubscription = null
  @observable settings = {
    interval: 0.5
  }

  @action send (msg) {
    this.device.writeCharacteristicWithoutResponseForService(
      'ffe0', 'ffe1', base64.encode(msg)
    )
  }

  @action connect (device, characteristicChangeCallback) {
    this.device = device
    this.state = ConnectionState.Connected

    this.clickSubscription = this.device.monitorCharacteristicForService(
      'ffe0', 'ffe1', (err, characteristic) => characteristicChangeCallback(base64.decode(characteristic.value))
    )

    this._startPingSubscription()
  }

  @action disconnect () {
    if (this.state === ConnectionState.Disconnected) {
      return
    }

    this._stopPingSubscription()

    this.clickSubscription.remove()
    this.clickSubscription = null

    this.bleManager.cancelDeviceConnection(this.device.id)
      .then(() => {
        this.device = null
        this.state = ConnectionState.Disconnected
      })
  }

  @action changeInterval (interval) {
    this._stopPingSubscription()
    this.settings = {...this.settings, interval}
    this._startPingSubscription()
  }

  _startPingSubscription () {
    if (this.state === ConnectionState.Connected) {
      this.pingSubscription = setInterval(() => this.send('1'), this.settings.interval * 60000)
    }
  }

  _stopPingSubscription () {
    if (this.pingSubscription) {
      clearInterval(this.pingSubscription)
      this.pingSubscription = null
    }
  }
}