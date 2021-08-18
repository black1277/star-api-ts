import React, { Component } from 'react'
import Spinner from '../spinner'

import './item-list.css'
import SwapiService from '../../services/swapi-service'
import {IPerson} from "../../type";

type Props = {
    onItemSelected: (id: number) => void;
}

export default class ItemList extends Component<Props, {}> {

    Swapi = new SwapiService()
    state = {
        peopleList: null
    }
    componentDidMount(): void {
        this.Swapi
            .getAllPeople()
            .then((peopleList)=>{
                this.setState({
                    peopleList
                })
            })
    }
    renderItems = (arr: IPerson[] | null) => {
        if (arr === null) return <Spinner />
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id as number)}
                >
                    {name}
                </li>
            )
        })
    }

    render() {
        const { peopleList } = this.state
        if (!peopleList) return <Spinner />
        const items = this.renderItems(peopleList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
  }
}

/*ItemList.defaultProps = {
    onItemSelected: (id: number) =>{}
}*/
