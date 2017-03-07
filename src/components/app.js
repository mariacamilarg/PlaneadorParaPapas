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
        type: "",
        reminderDate: "",
        amount: ""
      },
      items: [],
      displayTableKeys: ['name','type','dueDay','reminderDate','amount'],
      displayCategories: [],
      displayItemsByCategory: []
    }

    {/*Si quieres que los proyectos aparezcan de una sin necesidad del botón de actualizar, puedes llamar a la función getItems
      en el constructor, y se llamará al iniciar la aplicación*/}
  }

  addItem() {
    axios.post(ROOT_URL+"/users/"+this.state.user.id+"/items", this.state.item)
    .then(response => {
      this.setState({item: update(this.state.item, {name: {$set: ""}})});
      this.setState({item: update(this.state.item, {dueDay: {$set: ""}})});
      this.setState({item: update(this.state.item, {category: {$set: ""}})});
      this.setState({item: update(this.state.item, {type: {$set: ""}})});
      this.setState({item: update(this.state.item, {reminderDate: {$set: ""}})});
      this.setState({item: update(this.state.item, {amount: {$set: ""}})});
      this.getItems();
    })
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
      var newItems = response.data;
      this.setState({items: newItems });
      var cats = [];
      var i, newCat;
      for (i=0; i<newItems.length; i++){
        newCat = newItems[i]['category'];
        if(!this.containsElement(cats, newCat)) {
            cats.push(newCat);
        }
      }
      this.setState({displayCategories: cats});
    })
  }

  containsElement(arr, el) {
    var i;
    for(i = 0; i < arr.length; i++) {
        if(arr[i] === el){
          return true;
        }
    }
    return false;
  }


  render() {
    return(
      <div>

        <br />

        <div className="row">
          <h1>PLANEADOR PARA PAPAS</h1>
        </div>
        {/*Sería chevere que incluyeran una sección pequeña sobre la aplicación, por ejemplo para que se usa, como se usa
          y porque es lo máximo del planeta*/}
        <br />

        <div className="row">

          <div className="col-md-8 col-xs-12">
            {
              this.state.displayCategories != null &&
              this.state.displayCategories.map(function(cat, i) {
                return (
                  <div key={i}>
                    <div className="row">
                      <div className="col-md-12 col-xs-12">
                        <h2>{cat}</h2>
                        {/*Podrías retornar estas tablas dentro de un componente de categorias, que tuviera un componente de item
                          (Por lo que veo, no usas tu componente de item) No solo volvería tu aplicación más modular, sino que
                          te ayudaría a conseguir los 3 modulos que necesitas para la nota (Tienes tiempo hasta el jueves! YOU CAN DO IT)*/}
                        <table className="table table-striped custab">
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Tipo</th>
                              <th>Pagar en</th>
                              <th>Recordatorio</th>
                              <th>Valor</th>
                              <th className="text-center">Accion</th>
                              {/*
                                {this.props.titles.map(function(title) {
                                  return <th key={title}>{title}</th>;
                                })}
                              */}
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.items != null &&
                              this.state.items.map(function(row, i) {
                                if (row['category']==cat){
                                  return(
                                    <tr key={i}>
                                      {
                                        this.state.displayTableKeys.map(function(key) {
                                          return (
                                            <td key={key}>{row[key]}</td>
                                          )
                                          }, this)
                                      }
                                      <td className="text-center">
                                        {/*
                                        <button className="btn btn-info btn-xs" onClick={this.deleteItem.bind(this, row.id)}><span className="glyphicon glyphicon-edit"></span> Editar </button>
                                        <br />
                                        */}
                                        <button className="btn btn-danger btn-xs" onClick={this.deleteItem.bind(this, row._id)}><span className="glyphicon glyphicon-remove"></span> Eliminar </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              }, this)
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              }, this)
            }
            <br />
            <button className="btn btn-primary btn-xs pull-right" onClick={this.getItems.bind(this)}> Actualizar Items </button>
          </div>
          {/*También podrías pensar en convertir este elemento en un componente aparte, para que tu app sea más modular.*/}
          <div className="col-md-4 col-xs-12 custyle">
            <h2>Agregar Item</h2>
            <table className="table table-striped custab">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/*Sería chevere que explicaran lo que es cada campo, especialmente cosas no tan obvias como el tipo*/}
                  <td> Nombre </td>
                  <td> <input type="text" value={this.state.item.name} onChange={(event) => { this.setState({item: update(this.state.item, {name: {$set: event.target.value}})}) }} /> </td>
                </tr>
                <tr>
                  {/*Para algo un poco más avanzado (depronto futuras iteraciones) sería chevere pensar en que se puedan crear
                    categorías y se puedan usar más adelante como dropdown */}
                  <td> Categoria </td>
                  <td> <input type="text" value={this.state.item.category} onChange={(event) => { this.setState({item: update(this.state.item, {category: {$set: event.target.value}})}) }} /> </td>
                </tr>
                <tr>
                  <td> Tipo </td>
                  <td> <input type="text" value={this.state.item.type} onChange={(event) => { this.setState({item: update(this.state.item, {type: {$set: event.target.value}})}) }} /> </td>
                </tr>
                <tr>
                  <td> Pagar en </td>
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

        </div>

      </div>
    )
  }
}

export default App;
