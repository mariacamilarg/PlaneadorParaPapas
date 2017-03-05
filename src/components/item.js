import React, {Component} from 'react';
import axios from 'axios';
const ROOT_URL = "https://planeadorparapapasbackend.herokuapp.com";

class Item extends Component {

  getItems() {
    return axios.get(ROOT_URL+"/users/"+this.props.user.id+"/items")
  }

  addItem() {
    return axios.post(ROOT_URL+"/users/"+this.props.user.id+"/items", {
              name: this.props.item.name,
              dueDate: this.props.item.duedate,
              category: this.props.item.category,
              type: this.props.item.type,
              reminderDate: this.props.item.reminderdate,
              amount: this.props.item.value
            })
  }

  deleteItem() {
    return axios.delete(ROOT_URL+"/users/"+this.props.user.id)
  }


  render(){
    return (
      <div>
        {this.props.item.nombre}, {this.props.item.valor}
        <button onClick={this.borrarItem.bind(this)}>Borrar Item</button>
      </div>
    );
  }
}

export default Item;
