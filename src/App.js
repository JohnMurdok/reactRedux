import React, { Component, PropTypes } from 'react';
import { selectGit, fetchStreamsIfNeeded } from './actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { connect } from 'react-redux';

//List
import {
  AppBar
} from 'material-ui';

import GitForm from './component/GitForm';
import Grid from './component/Grid';
import Toast from './component/Toast';
import './App.css';

const appTitle = "Test ReactJS/Redux";

class App extends Component {

  static propTypes = {
    selectedGitStream: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedGitStream } = this.props;
    dispatch(fetchStreamsIfNeeded(selectedGitStream))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedGitStream !== this.props.selectedGitStream) {
      const { dispatch, selectedGitStream } = nextProps;
      dispatch(fetchStreamsIfNeeded(selectedGitStream))
    }
  }

  constructor(props) {
    super(props);
    this.props.dispatch(selectGit(""));
    let minDate = new Date();
    minDate.setHours(-72);
    this.state = {
      form: {
        minDate: minDate,
        maxDate: new Date(),
        filterByUser: ""
      },
      rowCount: 0
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  changeGitStream(gitStream) {
    this.props.dispatch(selectGit(gitStream));
  }

  updateForm(formValues) {
    this.setState({
      form: formValues
    });
  }

  showToast(rowCount){
    setTimeout( () => {
      this.setState({
        rowCount:rowCount
      })
    }, 2000)
  }

  render() {
    const { streamsByGitStream } = this.props;
    let gitStream = this.props.streamsByGitStream[this.props.selectedGitStream] || {
      isFetching: false,
      items: []
    };
    return (
      <div className="app">
        <AppBar title={appTitle} />
        <GitForm sendGitStream={this.changeGitStream.bind(this)} handleFormChange={this.updateForm.bind(this)} form={this.state.form} />
        <Grid streams={gitStream.items} form={this.state.form} showToast={this.showToast.bind(this)}/>
        <Toast count={this.state.rowCount} />
      </div>
    );
  }
}

//For material UI
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { selectedGitStream, streamsByGitStream } = state;
  const {
    isFetching,
    lastUpdated,
    items: gitDatas
  } = streamsByGitStream[selectedGitStream] || {
    isFetching: true,
    items: []
  };
  return {
    selectedGitStream,
    streamsByGitStream,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App)
