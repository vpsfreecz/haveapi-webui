var Package = require('../package.json');

export default {
	version: Package.version,
	repository: Package.repository.url,
};
