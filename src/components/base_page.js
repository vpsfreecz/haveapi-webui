var React = require('react');

var BasePage = React.createClass({
	render: function () {
		return (
			<div className="page">
				{this.props.children}
			</div>
		);
	}
});

module.exports = BasePage;
