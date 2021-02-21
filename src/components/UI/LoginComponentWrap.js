import React, { Component } from 'react'
import LoginComponent from '../component/LoginComponent';
import GoogleLogin from 'react-google-login';
import { deleteTokensForUser, sendGoogleAuthToken } from '../../RestAPIs/BackendApiCalls'
import { connect } from "react-redux";
import DummyButton from './DummyButton';

class LoginComponentWrap extends Component {
	constructor(props) {
		super(props)
		if (this.props.accessTokenStore === 'NONE') {
			console.log("PLEASE LOGIN.")
		}
		this.state = {
			isUserPresent: this.props.accessTokenStore,
			loggedInUserName: this.props.userName
		}
	}

	handleGoogleResponse = async (googleApiOutput) => {
		console.log(googleApiOutput);
		await sendGoogleAuthToken(
			googleApiOutput.accessToken
		).then((response) => {
			this.sendDispatchActions(response.access_token, response.refresh_token, response.user_name, "login")
		})
	}

	sendDispatchActions = (access_token, refresh_token, user_name, type) => {
		type === "login" ? 
			this.props.onNewUser(access_token, refresh_token, user_name) : 
			this.props.onRemoveUser(access_token, refresh_token, user_name)

		console.log('prevState', this.state.isUserPresent, user_name)
		const newIsUserPresent = access_token
		const newUserName = user_name
		this.setState({
			isUserPresent: newIsUserPresent,
			loggedInUserName: newUserName
		})
	}

	logoutHandler = async() => {
		await deleteTokensForUser(this.state.isUserPresent).then(() => {
			this.sendDispatchActions('NONE', 'NONE', 'NONE', "logout")
		})		
	}
	render() {
		return (
			<div>
				{
					this.state.isUserPresent==='NONE'?
						<div>
							Now only user: <br />
							username: admin  <br />
							password: admin
							<LoginComponent
								onLogin={(access_token, refresh_token, user_name) => this.sendDispatchActions(
									access_token, refresh_token, user_name, "login")
								}
							/>
							<hr />
							Login Through Google:   <br />
							<GoogleLogin
								clientId="1046733497997-fupu7ag3524l5re9o0fuhcm5d3a8r8gp.apps.googleusercontent.com"
								buttonText="Login"
								onSuccess={this.handleGoogleResponse}
								onFailure={this.handleGoogleResponse}
								cookiePolicy={'single_host_origin'}
							/>
							<hr />
						</div>
						:
						<div>
							<h1>wassup User, {this.state.loggedInUserName}</h1>
							<input type="button" value="Logout" onClick={this.logoutHandler} />
							<DummyButton accessToken = {this.state.isUserPresent}></DummyButton>
						</div>
				}
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		accessTokenStore: state.accessToken,
		refreshTokenStore: state.refreshToken,
		userNameStore: state.userName
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onNewUser: (at, rt, un) => dispatch({
			type: 'addAccessRefreshToken',
			newAccessToken: at,
			newRefreshToken: rt,
			newUserName: un
		}),
		onRemoveUser: (at, rt, un) => dispatch({
			type: 'resetStore',
			newAccessToken: at,
			newRefreshToken: rt,
			newUserName: un
		}),

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponentWrap);
