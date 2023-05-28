import React, { Component } from 'react'
import Spinner from '../spinner'
import { IBase } from '../../type'
import './item-list.css'

type ItemListProps = {
  onItemSelected: (id: number) => void
  getData: () => Promise<IBase[]>
}
type ItemListState = {
  itemList: null | IBase[]
}

export default class ItemList extends Component<ItemListProps, ItemListState> {

  state: ItemListState = {
    itemList: null
  }

  componentDidMount(): void {
    const { getData } = this.props
    getData()
      .then((itemList) => {
        this.setState({
          itemList
        })
      })
  }

  renderItems = (arr: IBase[] | null) => {
    if (arr === null) return <Spinner/>
    return arr.map(({ id, name }) => {
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
    const { itemList } = this.state
    if (!itemList) return <Spinner/>
    const items = this.renderItems(itemList)
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    )
  }
}
