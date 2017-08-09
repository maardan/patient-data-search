import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			usrInput: '',
			status: 'initial',
			txtError: false
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);	
		this.handleToggle = this.handleToggle.bind(this);	
	}

	handleInput(e) {
		this.setState({usrInput: e.target.value});
	}

	handleToggle() {
		this.state.status === 'initial' ? this.setState({status: 'new'}) : this.setState({status: 'initial'});
	}

	handleSearch() {
		if (this.state.usrInput.length > 0) {
			this.props.actions.getData(this.state.usrInput, this.state.status);
		}
		else {
			this.setState({ txtError: true }, () => setTimeout(() => this.setState({ txtError: false }), 500));
		}
	}

    handleKeyPress(target) {
        if (target.charCode === 13) // allow user to submit form by pressing the enter key
        	this.handleSearch();
    }

	render() {
		const styles = {
			center: {
				textAlign: '-webkit-center'
			},
			block: {
				maxWidth: 300
			}
		};

		return (
			<div style={styles.center} onKeyPress={this.handleKeyPress}>
				<TextField hintText="Enter Result ID (i.e. 126)" errorText={this.state.txtError} value={this.state.usrInput} onChange={this.handleInput} />
				<FlatButton label="Search" onTouchTap={this.handleSearch} />
    			<Toggle style={styles.block} label="Search including new lab results" onToggle={this.handleToggle} />
			</div>);
	}
}

//Redux Setup
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(SearchBar);