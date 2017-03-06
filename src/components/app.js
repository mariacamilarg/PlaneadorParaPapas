import React, {Component} from 'react';
import axios from 'axios';
import update from 'immutability-helper';

const ROOT_URL = "https://planeadorparapapasbackend.herokuapp.com";

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

  deleteItem(itemIDToDelete) {
    return axios.delete(ROOT_URL+"/users/"+this.state.user.id+"/items/"+itemIDToDelete)
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


  getItemsTable() {

    var tableString = '';

    tableString += '<div className="container">';;
    tableString +=  '<div className="row col-md-6 col-md-offset-2 custyle">';
    tableString +=   '<table className="table table-striped custab">';
    tableString +=    '<thead>';
    tableString +=     '<button className="btn btn-primary btn-xs pull-right" onClick={this.getItems.bind(this)}> Obtener items </button>'
    tableString +=      '<tr>';
    tableString +=       '<th>Nombre</th>';
    tableString +=       '<th>Categoria</th>';
    tableString +=       '<th>Tipo</th>';
    tableString +=       '<th>Fecha de Pago</th>';
    tableString +=       '<th>Recordatorio</th>';
    tableString +=       '<th>Valor</th>';
    tableString +=       '<th className="text-center">Accion</th>';
    tableString +=      '</tr>';
    tableString +=    '</thead>';

    var i;
    var it;
    var its = this.items;

    if (its != null) {
      for (i=0; i<its.length; i++){
        it = its[i];

        tableString += '<tr>';
        tableString +=  '<td>'+it.name+'</td>';
        tableString +=  '<td>'+it.category+'</td>';
        tableString +=  '<td>'+it.type+'</td>';
        tableString +=  '<td>'+it.dueDay+'</td>';
        tableString +=  '<td>'+it.reminderDate+'</td>';
        tableString +=  '<td>'+it.amount+'</td>';
        tableString +=  '<td className="text-center"><button className="btn btn-info btn-xs" onClick={this.getItems.bind(this)}><span class="glyphicon glyphicon-edit"></span> Editar </button> <button className="btn btn-danger btn-xs" onClick={this.getItems.bind(this)}><span class="glyphicon glyphicon-remove"></span> Eliminar </button> </td>';
        tableString += '</tr>';
      }
    }

    tableString +=   '</table>';
    tableString +=  '</div>';
    tableString += '</div>';

    return tableString;
  }

  getAddItemTable() {

    var i;
    var it;
    var tableString = '';

    tableString += '<div className="container">';;
    tableString +=  '<div className="row col-md-6 col-md-offset-2 custyle">';
    tableString +=   '<table className="table table-striped custab">';
    tableString +=    '<thead>';
    tableString +=     '<button className="btn btn-primary btn-xs pull-right" onClick={this.addItem.bind(this)}> Agregar </button>'
    tableString +=      '<tr>';
    tableString +=       '<th>Campo</th>';
    tableString +=       '<th>Valor</th>';
    tableString +=      '</tr>';
    tableString +=    '</thead>';

    tableString +=    '<tr>';
    tableString +=     '<td> Nombre </td>';
    tableString +=     '<td> <input type="text" value={this.state.item.name} onChange={(event) => { this.setState({item: update(this.state.item, {name: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=    '<tr>';
    tableString +=     '<td> Categoria </td>';
    tableString +=     '<td> <input type="text" value={this.state.item.category} onChange={(event) => { this.setState({item: update(this.state.item, {category: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=    '<tr>';
    tableString +=     '<td> Tipo </td>';
    tableString +=     '<td> <input type="text" value={this.state.item.type} onChange={(event) => { this.setState({item: update(this.state.item, {type: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=    '<tr>';
    tableString +=     '<td> Fecha de Pago </td>';
    tableString +=     '<td> <input type="date" value={this.state.item.dueDay} onChange={(event) => { this.setState({item: update(this.state.item, {dueDay: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=    '<tr>';
    tableString +=     '<td> Recordatorio </td>';
    tableString +=     '<td> <input type="date" value={this.state.item.reminderDate} onChange={(event) => { this.setState({item: update(this.state.item, {reminderDate: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=    '<tr>';
    tableString +=     '<td> Valor </td>';
    tableString +=     '<td> <input type="text" value={this.state.item.amount} onChange={(event) => { this.setState({item: update(this.state.item, {amount: {$set: event.target.value}})}) }} /> </td>';
    tableString +=    '</tr>';

    tableString +=   '</table>';
    tableString +=  '</div>';
    tableString += '</div>';

    return tableString;
  }

  joinToRender() {
    var toRender = '';

    toRender += '<div>'+this.getAddItemTable()+'</div>';
    toRender += '<br>';

    toRender += '<div>'+this.getItemsTable()+'</div>';
    toRender += '<br>';

    return toRender;
  }

  render() {
    return(
      <div className="row">

        <div className="col-md-5 custyle">
          <table className="table table-striped custab">
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> Nombre </td>
                <td> <input type="text" value={this.state.item.name} onChange={(event) => { this.setState({item: update(this.state.item, {name: {$set: event.target.value}})}) }} /> </td>
              </tr>
              <tr>
                <td> Categoria </td>
                <td> <input type="text" value={this.state.item.category} onChange={(event) => { this.setState({item: update(this.state.item, {category: {$set: event.target.value}})}) }} /> </td>
              </tr>
              <tr>
                <td> Tipo </td>
                <td> <input type="text" value={this.state.item.type} onChange={(event) => { this.setState({item: update(this.state.item, {type: {$set: event.target.value}})}) }} /> </td>
              </tr>
              <tr>
                <td> Fecha de Pago </td>
                <td> <input type="date" value={this.state.item.dueDay} onChange={(event) => { this.setState({item: update(this.state.item, {dueDay: {$set: event.target.value}})}) }} /> </td>
              </tr>
              <tr>
                <td> Recordatorio </td>
                <td> <input type="date" value={this.state.item.reminderDate} onChange={(event) => { this.setState({item: update(this.state.item, {reminderDate: {$set: event.target.value}})}) }} /> </td>
              </tr>
              <tr>
                <td> Valor </td>
                <td> <input type="text" value={this.state.item.amount} onChange={(event) => { this.setState({item: update(this.state.item, {amount: {$set: event.target.value}})}) }} /> </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary btn-xs pull-right" onClick={this.addItem.bind(this)}> Agregar </button>
        </div>

        <br />

        <div className="col-md-7">

        </div>

        <br />

      </div>
    )
  }
}

export default App;
