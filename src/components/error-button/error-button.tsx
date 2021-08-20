import React, { Component } from 'react'

import './error-button.css'

export default class ErrorButton extends Component<{},{ renderError:boolean }> {

  state = {
    renderError: false
  }

  render() {
    if (this.state.renderError) {
      throw new Error('User Error')
    }

    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={() => this.setState({renderError: true})}>
        Throw Error
      </button>
    )
  }
}
