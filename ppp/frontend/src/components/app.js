import React, {Component} from 'react';
import axios from 'axios';
import Item from './item';

const ROOT_URL = "http://planeadorparapapas.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id:"58bbb661691cc10011d15550"
      },
      item: {
        name: "",
        dueDate: "",
        category: "",
        type: "",
        reminderDate: "",
        amount: ""
      },
      items: [],
    }
  }

  addItem() {
    Item.agregarItem()
    .then(response => {
      this.getItems();
    })
  }

  deleteItem() {
    Item.deleteItem()
    .then(response => {
      this.getItems();
    })
  }

  getItems() {
    Item.getItems()
    .then(response => {
      this.setState({
        items: response.data
      })
    })
  }


  render() {
    return(
      <div>
        <button onClick={this.getItems.bind(this)}>
          Obtener items
        </button>

        {this.state.item.map(item => {
          return <Item item={item} />
        })}

        Nombre:
        <input type="text" value={this.state.item.name} onChange={(event) => {
          this.setState({name: event.target.value})
        }} />

        Fecha de Pago:
        <input type="text" value={this.state.item.dueDate} onChange={(event) => {
          this.setState({dueDate: event.target.value})
        }} />

        Categoria:
        <input type="text" value={this.state.item.category} onChange={(event) => {
          this.setState({category: event.target.value})
        }} />

        Tipo:
        <input type="text" value={this.state.item.type} onChange={(event) => {
          this.setState({type: event.target.value})
        }} />

        Recordatorio:
        <input type="text" value={this.state.item.reminderDate} onChange={(event) => {
          this.setState({reminderDate: event.target.value})
        }} />

        Valor:
        <input type="text" value={this.state.item.amount} onChange={(event) => {
          this.setState({amount: event.target.value})
        }} />

        <button onClick={this.addItem.bind(this)}>Agregar item</button>
      </div>  
    )
  }
}

export default App;
