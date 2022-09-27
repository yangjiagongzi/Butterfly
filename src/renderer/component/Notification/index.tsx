import React from 'react'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { notification } from './styles'

type Props = {
  appTheme: AppTheme
}

type State = {
  text: string
}

const notificationRef = React.createRef<Notification>()

class Notification extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  show = (message: string, duration = 2000) => {
    this.setState(
      {
        text: message
      },
      () => {
        setTimeout(() => {
          this.setState({ text: '' })
        }, duration)
      }
    )
  }

  render() {
    const { appTheme } = this.props
    const { text } = this.state
    if (!text) {
      return null
    }
    return <div className={notification(appTheme)}>{text}</div>
  }
}

export { Notification, notificationRef }

export default {
  show: (message: string, duration?: number) => {
    notificationRef.current?.show(message, duration)
  }
}
