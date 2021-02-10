import React, { Component } from 'react'
import { loginFormFields } from '../constants/LoginFormConstants'
import DynamicFormInput from '../UI/DynamicFormInput'
import {sendUsernamePassword} from '../../RestAPIs/BackendApiCalls'

class LoginComponent extends Component {
    constructor(props) {

        super(props)

        this.state = {
            loginForm: { ...loginFormFields },
        }

    }
    
    onChangeHandler = (event, formElementKey) => {
        event.preventDefault()
        const updatedLoginForm = {
            ...this.state.loginForm
        }

        const updatedFormElement = {
            ...updatedLoginForm[formElementKey]
        }

        updatedFormElement.value = event.target.value
        updatedLoginForm[formElementKey] = updatedFormElement
        this.setState({
            loginForm: updatedLoginForm
        })
    }

    loginHandler = async (event) => {
        event.preventDefault()
        const username = this.state.loginForm.username.value
        const password = this.state.loginForm.password.value
        const response = await sendUsernamePassword(
            username, password
        )
        this.props.onLogin(response.access_token, response.refresh_token)
    }
    render() {
        const formElementsArray = []
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        return (
            <form onSubmit={this.loginHandler}>
                    {formElementsArray.map(formElement => {
                        return (
                            <DynamicFormInput
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                style={formElement.config.style}
                                label={formElement.id}
                                changed={(event) => this.onChangeHandler(event, formElement.id)}
                            />
                        )
                    })}
                    <button type='submit'>LOGIN</button>
            </form>

        )
    }
}


export default LoginComponent;