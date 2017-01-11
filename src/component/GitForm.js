import React from 'react';
import TextField from 'material-ui/TextField';
import Datetime from 'react-datetime';
import moment from 'moment';
import locale_fr from "moment/locale/fr";

class GitForm extends React.Component {

    requireMsg = "This field is required";

    constructor(props) {
        super(props);

        moment.locale("fr", locale_fr);

        const minDate = this.props.form.minDate;
        const maxDate = this.props.form.maxDate;

        this.timer = null;
        this.dateTimer = null;

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            gitStream: "",// "https://api.github.com/events",
            errorText: this.requireMsg,
            filterByUser: ""
        };
    }

    handleChangeMinDate = (moment) => {
        //error case
        if (typeof moment === "string") {
            return;
        }

        this.setState({
            minDate: moment.toDate()
        });
        this.changeForm();
    };

    handleChangeMaxDate = (moment) => {
        //error case
        if (typeof moment === "string") {
            return;
        }
        this.setState({
            maxDate: moment.toDate()
        });
        this.changeForm();
    };

    handleGitStream = (event, data) => {
        this.setState({
            gitStream: data,
            errorText: data.length > 0 ? "" : this.requireMsg
        });

        if (data.length > 0 && new RegExp("^(http|https)://", "i").test(data)) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => this.props.sendGitStream(data), 500);
        }
    };

    changeForm = () => {
        if (this.dateTimer) {
            clearTimeout(this.dateTimer);
        }
        this.dateTimer = setTimeout(() => {
            this.props.handleFormChange({
                minDate: this.state.minDate,
                maxDate: this.state.maxDate,
                filterByUser: this.state.filterByUser
            });
        }, 1000);
    };

    handleFilterChange = (event, data) => {
        this.setState({
            filterByUser: data
        });
        this.changeForm();
    };

    render() {
        return (
            <div id="gitForm">
                <TextField
                    hintText="Git Stream"
                    errorText={this.state.errorText}
                    onChange={this.handleGitStream}
                    value={this.state.gitStream}
                    />
                <br />
                <Datetime defaultValue={this.state.minDate} dateFormat="DD/MM/YYYY" onChange={this.handleChangeMinDate} />
                <Datetime defaultValue={this.state.maxDate} dateFormat="DD/MM/YYYY" onChange={this.handleChangeMaxDate} />
                <TextField
                    hintText="Filter by user login"
                    onChange={this.handleFilterChange}
                    value={this.state.filterByUser}
                    />
            </div>
        );
    }
}


export default GitForm;