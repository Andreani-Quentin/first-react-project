import logo from './logo.svg';
import './App.css';
import React from "react";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            produits: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8888/Projet/api-rest/produits/lire.php")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        produits: result.produits
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, produits } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <h1>Mes produits</h1>
                        <div>
                            <ul>
                                {produits.map(produit => (
                                    <li class="table" key={produit.id}>
                                        <p>Nom : {produit.nom}</p>
                                        <p>Prix : {produit.prix}</p>
                                        <p>Description : {produit.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default App;
