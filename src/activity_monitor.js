export default class ActivityMonitor {
	constructor () {}

	startIdleTimer (callback, interval) {
		this.callback = callback;
		this.interval = interval;

		window.onmousemove = this.resetIdleTimer.bind(this);
		window.onmousedown = this.resetIdleTimer.bind(this); // catches touchscreen presses
		window.onclick = this.resetIdleTimer.bind(this);     // catches touchpad clicks
		window.onscroll = this.resetIdleTimer.bind(this);    // catches scrolling with arrow keys
		window.onkeypress = this.resetIdleTimer.bind(this);

		this.timeout = setTimeout(callback, interval);
	}

	resetIdleTimer () {
		if (!this.timeout)
			return;

		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.callback, this.interval)
	}

	stopIdleTimer () {
		if (!this.timeout)
			return;

		clearTimeout(this.timeout);
		this.timeout = null;
	}
}
