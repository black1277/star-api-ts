import React, { Component } from 'react'

import './person-details.css'
import SwapiService from '../../services/swapi-service'
import {IPerson} from '../../type'
type DetailProps = {
  personId: null | number
}
type DetailState = {
  person: null | IPerson
}
export default class PersonDetails extends Component<DetailProps, DetailState> {
  state = { person: null }

  swapiService = new SwapiService()

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps: { personId: number }) {
    if (this.props.personId !== prevProps.personId) {
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
        .then((person) => {
          this.setState({ person })
        })
  }

  render() {
/*    if (this.state.person === null) {
      return <span>Select a person from a list</span>;
    }
    const { id, name, gender, birthYear, eyeColor } = this.state.person*/

    const { person } = this.state
    if (person === null) {
      return <span>Select a person from a list</span>
    }

    // @ts-ignore
    const { id, name, gender, birthYear, eyeColor } = person

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
          </div>
        </div>
    )
  }
}