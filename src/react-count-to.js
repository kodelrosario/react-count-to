import React from 'react';

const CountTo = React.createClass({

  propTypes: {
    from: React.PropTypes.number,
    to: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    delay: React.PropTypes.number,
    onComplete: React.PropTypes.func,
    digits: React.PropTypes.number,
    className: React.PropTypes.string,
    min: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      from: 0,
      delay: 100,
      digits: 0,
    };
  },

  getInitialState() {
    const { from } = this.props;

    return {
      counter: from,
    };
  },

  componentDidMount() {
    this.start();
  },

  componentWillReceiveProps(nextProps) {
    const { from, to } = this.props;

    if (nextProps.to !== to || nextProps.from !== from) {
      this.start();
    }
  },

  componentWillUnmount() {
    this.clear();
  },

  start() {
    this.clear();
    this.setState(this.getInitialState(), () => {
      const { delay, speed, to } = this.props;
      const { counter } = this.state;
      this.loopsCounter = 0;
      this.loops = Math.ceil(speed / delay);
      this.increment = (to - counter) / this.loops;
      this.interval = setInterval(this.next, delay);
    });
  },

  next() {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      const { min } = this.props;
      this.setState(({ counter }) => ({
        counter: min == null ? counter + this.increment : Math.max(counter + this.increment, min),
      }));
    } else {
      const { onComplete } = this.props;
      this.clear();

      if (onComplete) {
        onComplete();
      }
    }
  },

  clear() {
    clearInterval(this.interval);
  },

  render() {
    const { className, digits } = this.props;
    const { counter } = this.state;
    const value = counter.toFixed(digits);

    return (
      <span className={className}>
        {value}
      </span>
    );
  },

});

export default CountTo;
