import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

export default class App extends React.Component {

	render() {
		return (
			<div>
				<h2>Search Last 3 Records</h2>
				<SearchBar />
				<SearchResults />
			</div>);
	}
}