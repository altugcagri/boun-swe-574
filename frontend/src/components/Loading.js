import React, { Component } from 'react';
import loadingGif from '../img/loading2.gif'


export default class Loading extends Component {

    render() {
        return (
            <div className="text-center loadingDiv serif font-30">
                <img src={loadingGif} alt="" /> <br /> <br />Loading...
            </div>
        )
    }
}
