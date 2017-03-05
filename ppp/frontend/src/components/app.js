import React, {Component} from 'react';
import axios from 'axios';
import update from 'immutability-helper';

const ROOT_URL = "http://planeadorparapapasbackend.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id:"58bbb661691cc10011d15550"
      },
      item: {
        name: "",
        dueDay: "",
        category: "",
        type: "",
        reminderDate: "",
        amount: ""
      },
      items: [],
    }
  }

  addItem() {
    axios.post(ROOT_URL+"/users/"+this.state.user.id+"/items", this.state.item)
    .then(response => {
      this.getItems();
    })
    // {
    //   name: this.state.item.name,
    //   dueDay: this.state.item.dueDay,
    //   category: this.state.item.category,
    //   type: this.state.item.type,
    //   reminderDate: this.state.item.reminderdate,
    //   amount: this.state.item.value
    // })
  }

  deleteItem() {
    return axios.delete(ROOT_URL+"/users/"+this.state.user.id)
    .then(response => {
      this.getItems();
    })
  }

  getItems() {
    axios.get(ROOT_URL+"/users/"+this.state.user.id+"/items")
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

        {this.state.items.map(item => {
          return <Item item={item} />
        })}

        Nombre:
        <input type="text" value={this.state.item.name} onChange={(event) => {
          this.setState({item: update(this.state.item, {name: {$set: event.target.value}})})
        }} />

        Fecha de Pago:
        <input type="date" value={this.state.item.dueDay} onChange={(event) => {
          this.setState({item: update(this.state.item, {dueDay: {$set: event.target.value}})})
        }} />

        Categoria:
        <input type="text" value={this.state.item.category} onChange={(event) => {
          this.setState({item: update(this.state.item, {category: {$set: event.target.value}})})
        }} />

        Tipo:
        <input type="text" value={this.state.item.type} onChange={(event) => {
          this.setState({item: update(this.state.item, {type: {$set: event.target.value}})})
        }} />

        Recordatorio:
        <input type="date" value={this.state.item.reminderDate} onChange={(event) => {
          this.setState({item: update(this.state.item, {reminderDate: {$set: event.target.value}})})
        }} />

        Valor:
        <input type="text" value={this.state.item.amount} onChange={(event) => {
          this.setState({item: update(this.state.item, {amount: {$set: event.target.value}})})
        }} />

        <button onClick={this.addItem.bind(this)}>
          Agregar item
        </button>
      </div>
    )
  }
}

export default App;
