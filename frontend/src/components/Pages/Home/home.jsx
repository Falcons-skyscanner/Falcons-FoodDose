import React from 'react';
// import '../../rest-toDelete/Shiekhaljabal/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './home.css'
// import Logout from '../logout/logout.js'
import Category from './Category';
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";
// import Title from '../../rest-toDelete/Title/title'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        this.getCategories()
    }
    getCategories = () => {
        fetch('/categories/getCategories')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ categories: data.categories })
            })
    }

    render() {
        const { categories } = this.state
        return (
            <div>
                <div class='categories'>
                    {
                        categories ? categories.map((categ, i) => <Category category={categ} key={i} />) : <div></div>
                    }
                </div>
                {
                    this.props.adminId && this.props.login ? <Link to='/admin'><Button> Go to admin Panel </Button></Link> : <div></div>
                }
            </div>
        );
    }
}


export default Home;