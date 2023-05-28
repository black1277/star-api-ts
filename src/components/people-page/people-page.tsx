import React, { Component } from 'react'

import ItemList from '../item-list/item-list'
import PersonDetails from '../person-details/person-details'
import ErrorIndicator from '../error-indicator/error-indicator'
import SwapiService from '../../services/swapi-service'
import './people-page.css'

type PeoplePageState = {
  selectedPerson: number | null
  hasError: boolean
}
export default class PeoplePage extends Component<{}, PeoplePageState> {
  swapiService = new SwapiService()
  state: PeoplePageState = {
    selectedPerson: null,
    hasError: false
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true
    })
  }

  onPersonSelected = (selectedPerson: number) => {
    this.setState({ selectedPerson })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>
    }

    return (
      <div className="row mt-2">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
          />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
    )
  }
}
