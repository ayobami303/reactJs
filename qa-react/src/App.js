import React, { Component } from 'react';
import NavBar from "./NavBar/NavBar";
import Questions from "./Questions/Questions";
import { Route, withRouter } from 'react-router-dom';
import Question from './Question/Question';
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import NewQuestion from './NewQuestion/NewQuestion';
import auth0Client from './Auth';

class App extends Component {
	async componentDidMount(){
		if(this.props.location.pathname === '/callback')  return;
		try{
			await auth0Client.silentAuth();
			this.forceUpdate();
		} catch (err) {
			if(err.error === 'login_required') return;
			console.log(err.error)
		}
	}

	render() {
		return (
			<div className="App">       
				<NavBar></NavBar>
				<Route exact path = "/" component = {Questions}></Route>				
				<Route exact path = "/question/:questionId" component = {Question}></Route>
				<Route exact path = "/callback" component = {Callback}></Route>
				<SecuredRoute path = "/new-question" component = {NewQuestion}></SecuredRoute>
			</div>
		);
	}
}

export default withRouter(App);
