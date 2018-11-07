import React, { Component } from 'react';
import axios from 'axios';


export default class Main extends Component{
    
    state = {
        data:[],
        search: this.props.data
    }

    search = (event) => {
        event.preventDefault();
        
        let value = document.getElementById('search').value
        axios.get(`https://www.liverpool.com.mx/tienda/?s=${value}&d3106047a194921c01969dfdec083925=json`)
        .then( response => {
            
            let data =(response.data.contents[0].mainContent[3].contents[0].records);
            if(data[0].productId){
                
               let busquedas = JSON.parse(sessionStorage.getItem('names'));
               
                if(busquedas === null) busquedas = {search:[]};
                busquedas.search.push(value);
                sessionStorage.setItem('names',JSON.stringify(busquedas));
                    this.setState({data,search:busquedas});
               
            }else{
                alert('Producto No encontrado, pruebe con otro')
            }
        })
    }

 
    render(){ 
        console.log(this.state)
        return(
            <div className="main-container">
                <aside>
                <h3>Ultimas Busquedas</h3>
                {
                    this.state.search.search.map(item => (<p>{item}</p>))
                }
                </aside>
                <main>
                    <form onSubmit={this.search} id="form">
                        <label htmlFor="search">Busqueda</label>   
                        <input type="search" name="name" id="search" placeholder="Producto a Buscar" required />
                        <input type="submit" value="buscar" />
                    </form>
                    <div className="products-container">
                        {
                            this.state.data.map(item => {
                                
                                return (<div className="product" key={item.productId[0]}>
                                    <img src={item.largeImage[0]} alt="" />
                                    <h3>{item.productDisplayName[0]}</h3>
                                    <p>Precio: ${item.salePrice[0]}</p>
                                </div>)
                            })
                        }
                    </div>
                </main>

            </div>
        )
    }
}