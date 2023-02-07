import React from 'react';
import Typewriter from 'typewriter-effect';

// create a new class component in react with name tpy
export default class CustomTypewriter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return <div className={`${this.props.showSelect && 'remove-styles'} typwriter`}>
            <Typewriter
                options={{loop:false, delay:'10'}}
                onInit={(typewriter) => {
                    typewriter.typeString(
                        '<h2 style="color: #ffff;">Welcome to Enhanced ChatGPT! <br/> Please select model below to continue! </h2>')
                        .callFunction(() => {
                            this.props.setShowSelect(true);
                            console.log('String typed out!');
                        })
                        .pauseFor(500)
                        // .deleteAll()
                        .callFunction(() => {
                            console.log('All strings were deleted');
                        })
                        .start();
                }}
            />
        </div>
    }
}