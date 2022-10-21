import React, { Component } from 'react'
import livreurService from './services/livreurService'

class ListLivreur extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livreurs: []
        }
        this.addLivreurs = this.addLivreurs.bind(this);
        this.editLivreurs = this.editLivreurs.bind(this);
        this.deleteLivreurs = this.deleteLivreurs.bind(this);
    }

    deleteLivreurs(id){
        LivreurService.deleteLivreurs(id).then( res => {
            this.setState({livreurs: this.state.livreurs.filter(livreurs => livreurs.id !== id)});
        });
    }
    viewLivreurs(id){
        this.props.history.push(`/view-liveur/${id}`);
    }
    editLivreurs(id){
        this.props.history.push(`/add-livreur/${id}`);
    }

    componentDidMount(){
    LivreurService.getLivreurs().then((res) => {
            this.setState({ livreurs: res.data});
        });
    }

    addLivreurs(){
        this.props.history.push('/add-livvreeur/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">liste des livreurs</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Ajouter des livreurs</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Nom du livreur</th>
                                    <th> Prenom du livreur</th>
                                    <th> Numéro du livreur</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.livreurs.map(
                                        livreurs=> 
                                        <tr key = {livreurs.id}>
                                             <td> { livreurs.firstName} </td>   
                                             <td> {livreurs.lastName}</td>
                                             <td> {livreurs.numero}</td>
                                             <td>
                                                 <button onClick={ () => this.editLivreurs(livreurs.id)} className="btn btn-info">Modifier </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteLivreurs(livreurs.id)} className="btn btn-danger">Supprimer </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewLivreurs(livreurs.id)} className="btn btn-info">Voir </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListLivreur
