import React, { Component } from 'react'
import ErrorIndicator from '../error-indicator/error-indicator'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundry extends Component<Props, State> {

  state: State = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator />
    return this.props.children
  }
}