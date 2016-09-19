var React = require('react');
var Link = require('react-router').Link;

var ApiSelector = React.createClass({
	getInitialState: function () {
		return {
			//url: 'https://api.vpsfree.cz',
			url: 'http://192.168.122.11:4567',
		};
	},

	handleChange: function (event) {
		this.setState({url: event.target.value});
	},

	render: function () {
		return (
			<form>
				<label>API URL:</label>
				<input type="text" value={this.state.url} onChange={this.handleChange} />
				<Link to={'/api/' + encodeURIComponent(this.state.url)}>Go!</Link>
			</form>
		);
	}
});

module.exports = ApiSelector;
