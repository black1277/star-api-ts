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
    gender: string
    birthYear: string | null
    eyeColor: string | null
}

export interface IStarship extends IBase{
    model: string
    manufacturer: string
    costInCredits: string
    length: string
    crew: string
    passengers: string
    cargoCapacity: string
}