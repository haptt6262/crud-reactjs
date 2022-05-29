import React, { Component } from 'react'

export default class index extends Component {
    state = {
        name: '',
        textSearch: ''
    }
    render() {
        let listButton = []
        for (let i = 1; i <= this.props.totalPage; i++) {
            listButton.push(i)
        }
        let listData = []
        if (this.props.items) {
            listData = this.props.items.map((item, index) => {
                return (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{item.name}</th>
                        <th>
                            <button onClick={() => { this.props.deleteItem({ id: item._id }) }}>DELETE</button>
                        </th>
                        <th>
                            <button onClick={() => { this.setState({ id: item._id, name: item.name }) }}>SELECT</button>
                        </th>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input onChange={(e) => { this.setState({ name: e.target.value }) }} value={this.state.name} />
                    <button onClick={() => { this.props.addItem({ name: this.state.name }) }}>ADD</button>
                    <button onClick={() => { this.props.updateItem({ id: this.state.id, name: this.state.name }) }}>UPDATE</button>
                </div>
                <div>
                    <input onChange={(e) => { this.setState({ textSearch: e.target.value }) }} />
                    <button onClick={() => { this.props.searchPaginationItem({ textSearch: this.state.textSearch, activePage: 1 }) }}> SEARCH</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData}
                        </tbody>
                    </table>
                </div>
                <div>
                    {
                        listButton.map((item, index) => {
                            return (
                                <button onClick={() => {
                                    this.props.textSearch
                                        ? this.props.searchPaginationItem({ textSearch: this.props.textSearch, activePage: item })
                                        : this.props.paginationItem(item)
                                }}
                                    key={index}
                                    style={{ background: this.props.activePage === item ? "red" : null }}
                                >{item}</button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
