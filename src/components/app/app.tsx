import React, {Component} from 'react'
import Header from '../header'
import RandomPlanet from '../random-planet'
import ItemList from '../item-list'
import PersonDetails from '../person-details'

import './app.css'
type AppState = {
    showRandomPlanet: boolean
    selectedPerson: number|null
}
export default class App extends Component<{}, AppState> {

    state = {
        showRandomPlanet: true,
        selectedPerson: null
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onPersonSelected = (id: number) => {
        this.setState({
            selectedPerson: id
        })
    }
    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null

        return (
            <div>
                <Header/>
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails/>
                    </div>
                </div>
            </div>
        )
    }
}
