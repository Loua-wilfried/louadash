import React, { Component } from 'react'
import livreurService from './services/livreurService';

class CreateLiveur extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nom: '',
            prenom: '',
           numero: ''
        }
        this.changeNomHandler = this.changeNomHandler.bind(this);
        this.changePrenomHandler = this.changePrenomHandler.bind(this);
        this.saveOrUpdateLivreurs = this.saveOrUpdateLivreurs.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            LivreursService.getEmployeeById(this.state.id).then( (res) =>{
                let livreurs = res.data;
                this.setState({nom: livreurs.nom,
                    prenom: livreurs.prenom,
                    numero : livreurs.numero
                });
            });
        }        
    }
    saveOrUpdateLivreurs = (e) => {
        e.preventDefault();
        let livreurs = {nom: this.state.nom, prenom: this.state.prenom, numero: this.state.numero};
        console.log('livreurs => ' + JSON.stringify(livreurs));

        // step 5
        if(this.state.id === '_add'){
            LivreursService.createLivreurs(livreurs).then(res =>{
                this.props.history.push('/Livreurs');
            });
        }else{
            LivreursService.updateLivreurs(livreurs, this.state.id).then( res => {
                this.props.history.push('/Livreurs');
            });
        }
    }
    
    changeNomHandler= (event) => {
        this.setState({nom: event.target.value});
    }

    changeprenomHandler= (event) => {
        this.setState({prenom: event.target.value});
    }

    changeNumeroHandler= (event) => {
        this.setState({numero: event.target.value});
    }

    cancel(){
        this.props.history.push('/livreurs');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Ajouer un livreur</h3>
        }else{
            return <h3 className="text-center">Modifer</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nom: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.nom} onChange={this.changeNomHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>prenom: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.prenom} onChange={this.changeprenomHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> numero: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.numero} onChange={this.changeNumeroHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateLivreurs}>Enregister</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Supprimer</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateLiveur
