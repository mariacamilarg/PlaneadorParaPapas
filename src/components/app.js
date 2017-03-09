import React, {Component} from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import AgregarItem from './agregarItem';
import ListarItems from './listarItems';

const ROOT_URL = "https://planeadorparapapasbackend.herokuapp.com";

/*
Buen manejo del state. Pero dos recomendaciones:
1. Depronto trata de hacerlo mas modular, partiendo este App
en varios componentes que te faciliten la modificabilidad y
la lectura del codigo.
2. Falta agregar un poco mas de estilo, hay toda una implementación
de bootstrap para react, se llama react-bootstrap. Permite hacer
Navbars facil, hay buenos ejemplos y creo que hay free templates que
pueden servir de guia.
*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id:'58c0c26ba58316000489009a'
      },
      componentMounted: false
    }
  }

  componentDidMount() {
    this.setState({componentMounted: true})
  }

  updateItemsList() {
    if (this.state.componentMounted){
      this.listarItemsChild.updateItemsList();
    }
  }

  render() {
    return(
      <div>

        <br />

        <div className="row">
          <h1>PLANEADOR PARA PAPAS</h1>
          <p>
            PPP es una aplicación que permite tener el control sobre los pagos
            periódicos que debe hacer un adulto en Colombia. Por ahora soportamos
            3 categorías principales referentes a viviendas (casa), vehiculos (carro)
            y finanzas personales.
          </p>
        </div>

        <br />

        <div className="row">

          {/* Componente: Listar Items */}
          <div className="col-md-8 col-xs-12">
            <ListarItems ref={(input) => { this.listarItemsChild = input; }} user={this.state.user} />
          </div>

          {/* Componente: Agregar Item */}
          <div className="col-md-4 col-xs-12 custyle">
            <AgregarItem user={this.state.user} updateItemsList={this.updateItemsList.bind(this)}/>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
