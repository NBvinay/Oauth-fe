import React, { Component } from 'react'
import LoginComponent from '../component/LoginComponent';
import GoogleLogin from 'react-google-login';
import { sendGoogleAuthToken } from '../../RestAPIs/BackendApiCalls'
import { connect } from "react-redux";

class LoginComponentWrap extends Component {
	constructor(props) {
		super(props)
		if (this.props.accessTokenStore === 'NONE') {
			console.log("PLEASE LOGIN.")
		}
		this.state = {
			isUserPresent: this.props.accessTokenStore
		}
	}

	responseGoogle = async (googleApiOutput) => {
		await sendGoogleAuthToken(
			googleApiOutput.accessToken
		).then((response) => {
			console.log("before called Dispatch")
			this.sendDispatchActions(response.access_token, response.refresh_token)
			console.log("after called Dispatch")
		})
	}

	sendDispatchActions = (access_token, refresh_token) => {
		console.log("sendDispatchActions")
		this.props.onNewUser(access_token,refresh_token)

		console.log('prevState', this.state.isUserPresent)

		const newState = access_token
		this.setState({
			isUserPresent: newState,
		})
	}

	logoutHandler = () => {
		this.sendDispatchActions('NONE', 'NONE')
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
								onLogin={(access_token, refresh_token) => this.sendDispatchActions(access_token, refresh_token)}
							/>
							<hr />
							Login Through Google:   <br />
							<GoogleLogin
								clientId="1046733497997-fupu7ag3524l5re9o0fuhcm5d3a8r8gp.apps.googleusercontent.com"
								buttonText="Login"
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
								cookiePolicy={'single_host_origin'}
							/>
							<hr />
						</div>
						:
						<div>
							<h1>wassup User, {this.state.isUserPresent}</h1>
							<input type="button" value="Logout" onClick={this.logoutHandler} />
						</div>
				}
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		accessTokenStore: state.accessToken,
		refreshTokenStore: state.refreshToken
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onNewUser: (at, rt) => dispatch({
			type: 'addAccessRefreshToken',
			newAccessToken: at,
			newRefreshToken: rt,
		})
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponentWrap);
