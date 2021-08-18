import React, {Component} from 'react'
import SwapiService from '../../services/swapi-service'
import './random-planet.css'
import {IPlanet} from '../../type'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

export default class RandomPlanet extends Component {
  state = {
    planet: {
      id: 2,
      url: '',
      name: '',
      population: '',
      rotationPeriod: '',
      diameter: ''
    },
    loading: true,
    error: false
  }

  Swapi = new SwapiService()

  componentDidMount(): void {
    this.updatePlanet()
  }

  onPlanetLoad = (planet: IPlanet) => {
    this.setState({
      planet,
      loading: false
    })
  }

  onError = (err: any) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet(){
    let id = Math.floor(Math.random()*25) + 2
    this.Swapi
        .getPlanet(id)
        .then(this.onPlanetLoad)
        .catch(this.onError)
  }

  render() {
    const { planet, loading, error } = this.state
    let content = loading ? <Spinner/> : <PlanetView {...planet} />
    content = error ? <ErrorIndicator/> : content
    return (
      <div className="random-planet jumbotron rounded">
        {content}
      </div>
    )
  }
}

const PlanetView: React.FC<IPlanet> = ({id, name, population, rotationPeriod, diameter}) => {
  return (
      <React.Fragment>
        <img className="planet-image" alt="planet"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name} - {id}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  )
}