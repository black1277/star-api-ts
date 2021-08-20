import React, { Component } from 'react'
import {IPerson} from '../../type'
import Spinner from '../spinner'
import SwapiService from '../../services/swapi-service'
import './person-details.css'
import ErrorButton from '../error-button'

type DetailProps = {
  personId: null | number
}
type DetailState = {
  person: null | IPerson
  loading: boolean
}

export default class PersonDetails extends Component<DetailProps, DetailState> {

  state:DetailState  = {
    person: null,
    loading: true
  }

  swapiService = new SwapiService()

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps: { personId: number }) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      })
      this.updatePerson()
    }
  }

  updatePerson() {
    const { personId } = this.props
    if (!personId) {
      return
    }
    this.swapiService
        .getPerson(personId)
        .then((person: IPerson) => {
          this.setState({
            person,
            loading: false
          })
        })
  }

  render() {
    if (this.state.person === null) {
      return <span>Select a person from a list</span>
    }
    const { id, name, gender, birthYear, eyeColor } = this.state.person
    if(this.state.loading) return <Spinner/>
    return (
        <div className="person-details card">
          <img className="person-image"
               src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
               alt="character"/>

          <div className="card-body">
            <h4>{name} {this.props.personId}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Gender</span>
                <span>{gender}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Birth Year</span>
                <span>{birthYear}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Eye Color</span>
                <span>{eyeColor}</span>
              </li>
            </ul>
            <ErrorButton />
          </div>
        </div>
    )
  }
}