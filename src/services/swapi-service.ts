import {IPerson, IPlanet, IStarship} from '../type'
type Item = IPerson | IPlanet | IStarship

export default class SwapiService {

    _apiBase = 'https://swapi.dev/api'

    getResource = async (url: string) => {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json()
    }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`)
        return res.results.map(this._transformPerson)
    }

    getPerson = async (id: number) => {
        const person = await this.getResource(`/people/${id}/`)
        return this._transformPerson(person)
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet)
    }

    getPlanet = async (id: number) => {
        const planet = await this.getResource(`/planets/${id}/`)
        return this._transformPlanet(planet)
    }

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship)
    }

    getStarship = async (id: number) => {
        const starship = await this.getResource(`/starships/${id}/`)
        return this._transformStarship(starship)
    }

    _extractId = (item: Item) => {
        const idRegExp = /\/([0-9]*)\/$/
        let result = '2'
            if(!Object.is(item.url.match(idRegExp)![1], null)) result = item.url.match(idRegExp)![1]
        return Number(result)
    }

    _transformPlanet = (planet: IPlanet) => {
        return {
            id: this._extractId(planet),
            url: planet.url,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship = (starship: IStarship) => {
        return {
            id: this._extractId(starship),
            url: starship.url,
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person: IPerson) => {
        return {
            id: this._extractId(person),
            url: person.url,
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }
}