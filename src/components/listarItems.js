import React, {Component} from 'react';
import axios from 'axios';
import update from 'immutability-helper';
const ROOT_URL = "https://planeadorparapapasbackend.herokuapp.com";

class ListarItems extends Component {

  constructor(props){
    super(props);
    this.state={
      items: [],
      tableTitles: ['Nombre','Tipo','Pagar en','Recordatorio','Valor', 'Acción'],
      displayTableKeys: ['name','type','dueDay','reminderDate','amount'],
      formatsDisplayTableKeys: ['string','string','date','date','money'],
      displayCategories: []
    }

    this.updateItemsList();
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

  updateItemsList() {
    axios.get(ROOT_URL+"/users/"+this.props.user.id+"/items")
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

  deleteItem(itemIDToDelete) {
    return axios.delete(ROOT_URL+"/users/"+this.props.user.id+"/items/"+itemIDToDelete)
    .then(response => {
      this.updateItemsList();
    })
  }

  render(){
    return (
      <div>
        {
          this.state.displayCategories != null &&
          this.state.displayCategories.map(function(cat, i) {
            return (
              <div key={i}>
                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    <h2>{cat}</h2>
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
                            {this.state.tableTitles.map(function(title) {
                              return <th key={title} className="text-center">{title}</th>;
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
                                    this.state.displayTableKeys.map(function(key, j) {
                                      if (this.state.formatsDisplayTableKeys[j] =='date'){
                                        var date = row[key].split('T')[0].split('-'); //2017-01-12
                                        return (
                                          <td key={key}>{date[2]}/{date[1]}/{date[0]}</td>
                                        );
                                      }
                                      else if (this.state.formatsDisplayTableKeys[j] =='money') {
                                        var money = Number(row[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                                        return (
                                          <td key={key}>${money}</td>
                                        );
                                      }
                                      else{
                                        return (
                                          <td key={key}>{row[key]}</td>
                                        );
                                      }
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
        <button className="btn btn-primary btn-xs pull-right" onClick={this.updateItemsList.bind(this)}> Actualizar Items </button>
      </div>
    );
  }
}

export default ListarItems;
