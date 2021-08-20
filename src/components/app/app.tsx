import React, {Component} from 'react'
import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorButton from '../error-button'
import PeoplePage from '../people-page'
import ErrorIndicator from '../error-indicator'
import './app.css'

type AppState = {
    showRandomPlanet: boolean
    hasError: boolean
}
export default class App extends Component<{}, AppState> {

    state = {
        showRandomPlanet: true,
        hasError: false
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({hasError: true})
    }

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null
        if(this.state.hasError) {
            return  <ErrorIndicator/>
        }
        return (
            <div>
                <Header/>
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton />
                <PeoplePage />
                <hr/>
                <PeoplePage />
            </div>
        )
    }
}
