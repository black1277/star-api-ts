import React, { Component } from 'react'
import Spinner from '../spinner'
import { IUnion } from '../../type'
import './item-list.css'

type ItemListProps<T> = {
  onItemSelected: (id: number) => void
  getData: () => Promise<T[]>
  children: (item: T) => string | React.ReactNode
}
type ItemListState<T> = {
  itemList: null | T[]
}

export default class ItemList extends Component<ItemListProps<IUnion>, ItemListState<IUnion>> {

  state: ItemListState<IUnion> = {
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

  renderItems = <T extends IUnion>(arr:T[]) => {
    if (arr === null) return <Spinner/>
    const renderLabel = this.props.children
    return arr.map((item) => {
      const { id } = item
      const label = renderLabel(item)
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}
        >
          {label}
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
