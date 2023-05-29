import React, { Component } from 'react'
import ItemList from '../item-list/item-list'
import PersonDetails from '../person-details/person-details'
import ErrorIndicator from '../error-indicator/error-indicator'
import SwapiService from '../../services/swapi-service'
import { IPerson, IUnion } from '../../type'
import Row from '../row'
import './people-page.css'
import ErrorBoundry from '../error-boundry'

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

  onPersonSelected = (selectedPerson: number) => {
    this.setState({ selectedPerson })
  }

  renderLabel = (item: IUnion)=> {
    const intr = item as IPerson
    return  (
      <>
        {intr.id} <strong> - {intr.name} </strong>
        {intr.birthYear} - <em>{intr.gender}</em>
      </>
    )
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {this.renderLabel}
      </ItemList>)

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails
          personId={this.state.selectedPerson}
        />
      </ErrorBoundry>)

    return (
      <Row left={itemList} right={personDetails} />
    )
  }
}
