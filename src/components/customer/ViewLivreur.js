import React, { Component } from 'react'
import livreurService
 from './services/livreurService'

class ViewLivreur extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getLivreursById(this.state.id).then( res => {
            this.setState({livreurs: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Detail des infos livreur</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>Nom du livreur: </label>
                            <div> { this.state.Livreurs.nom }</div>
                        </div>
                        <div className = "row">
                            <label> Prenom du livreur: </label>
                            <div> { this.state.Livreurs.prenom }</div>
                        </div>
                        <div className = "row">
                            <label> Numéro du livreur: </label>
                            <div> { this.state.Livreurs.numero }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewLivreur