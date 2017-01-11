import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Toast extends React.Component {

    constructor(props) {
        super(props);
        this.currentCount = 0;
    }
    
    render() {
        let open = this.props.count > 0 && this.currentCount !== this.props.count;
        let message = "You have " + this.props.count + " datas";
        this.currentCount = this.props.count;
        return (
            <div>
                <Snackbar
                    open={open}
                    message={message}
                    autoHideDuration={4000}
                    />
            </div>
        );
    }
}