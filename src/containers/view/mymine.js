import * as React from 'react';

export default class MyMine extends React.Component {
    componentDidMount() {

    }
    render() {
        // const currUser = {name:'test',password:'****',token:'123456'};
        const currUser = '';
        if (currUser) {
            return (
                <div>

                </div>
            )
        } else {
            return (
                <div>
                    <img src={require('../../img/unlogin.jpg')} />
                </div>
            )
        }

    }
}