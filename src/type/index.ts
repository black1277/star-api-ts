interface IBase {
    id?: number
    name: string
    url: string
}

export interface IPlanet extends IBase{
    population: string
    rotation_period?: string
    rotationPeriod?: string
    diameter: string
}

export interface IPerson extends IBase{
    gender: number
    birthYear: number
    eyeColor: string
}

export interface IStarship extends IBase{
    model: string
    manufacturer: string
    costInCredits: string
    length: string
    crew: number
    passengers: number
    cargoCapacity: string
}