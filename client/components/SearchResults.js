import React from 'react';
import { connect } from 'react-redux';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	stepIndex: 0,
    };
  }

  getStepContent(stepIndex) {
  	const selectedRes = this.props.results[stepIndex];

  	return (
  		<div>
  			<p>Date: {selectedRes.date}</p>
  			<p>Result ID: {selectedRes.result_id}</p>
  			<p>Name: {selectedRes.name}</p>
  			<p>Value: {selectedRes.value}</p>
  			<p>Patient ID: {selectedRes.patient_id}</p>
  		</div>);
  	}

	resStatus() {
	    const {stepIndex} = this.state;
	    const { loading, error, results } = this.props;
	    const contentStyle = { padding: 15 };

		if (loading) {
			return <CircularProgress size={80} thickness={5} />;
		}
		else if (error) {
			return error;
		}
		else if (results.length > 0) {
			return (
				<div>
					<Stepper linear={false} activeStep={stepIndex} connector={<ArrowBackIcon />}>
						{results.map((obj, i) => <Step><StepButton onClick={() => this.setState({stepIndex: i})}>{obj.value}</StepButton></Step>)}
					</Stepper>
					<div>
						<Paper style={contentStyle} zDepth={5}>{this.getStepContent(stepIndex)}</Paper>
					</div>
				</div>);
		}
	}

	render() {
		return (
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
				{this.resStatus()}
			</div>);
	}
}

//Redux Setup
function mapStateToProps(state) {
	return {
		results: state.application.results,
		loading: state.application.loading,
		error: state.application.error
	}
}

export default connect(mapStateToProps, null)(SearchResults);