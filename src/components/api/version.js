import React from 'react'
import HaveAPI from '../../haveapi-client'
import ApiPage from '../../containers/api_page'
import Config from '../../config'

var ApiVersion = React.createClass({
	getInitialState: function () {
		return {
			versions: null,
			defaultVersion: null,
		};
	},

	getChildContext: function () {
		return {
			api: this.api,
		};
	},

	componentDidMount: function () {
		this.api = new HaveAPI.Client(Config.apiUrl || this.props.params.url, {
			version: this.props.params.version || undefined,
		});
		this.setup(this.props);
	},

	componentWillUpdate: function (nextProps) {
		console.log('api version will update', nextProps);

		if (this.props.params.version != nextProps.params.version) {
			this.setState(this.getInitialState());
			this.setup(nextProps);
		}
	},

	setup: function (props) {
		var that = this;
		this.api._private.version = props.params.version || undefined,

		this.api.availableVersions(function (c, status, versions) {
			if (!status) {
				console.log('oops, failed to get versions');
				return;
			}

			console.log('got versions', c, status, versions);

			that.api._private.versions = versions.versions;
			that.api._private.currentVersion = props.params.version;

			that.setState({
				versions: versions.versions,
				defaultVersion: versions.default,
			});

			if (!that.props.params.version)
				that.context.router.push('/'+versions.default);
		});

	},

	render: function () {
		if (this.state.versions) {
			var apiUrl = Config.apiUrl || this.props.params.url;

			return (
				<ApiPage {...this.props} />
			);

		} else return <h2>Loading...</h2>;
	}
});

ApiVersion.childContextTypes = {
	api: React.PropTypes.object,
};

ApiVersion.contextTypes = {
	router: React.PropTypes.object,
	store: React.PropTypes.object,
};

export default ApiVersion;
