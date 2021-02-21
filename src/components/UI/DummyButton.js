import React, { Component } from 'react'
import {dummyButtonAPI} from '../../RestAPIs/BackendApiCalls'

class DummyButton extends Component {

    clickHandler =async (event) =>  {
        const response = await dummyButtonAPI(this.props.accessToken)
        console.log(response);
    }

    render() {
        return (
            <div>
                <input type="button" value="Dummy Button" onClick={this.clickHandler} />
            </div>
        )
    }
}

export default DummyButton
