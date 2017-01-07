import React from 'react';

export default function provideApi(
  Child,
  urlOrMapPropsToUrl,
  mapResToProps = (apiResponse) => ({ apiResponse }),
) {
  return class ProvideApi extends React.Component {
    constructor(props) {
      super(props);
      this.state = { res: null, url: null };
      this.getUrl = this.getUrl.bind(this);
      this.fetchUrl = this.fetchUrl.bind(this);
    }

    getUrl() {
      let reqUrl = urlOrMapPropsToUrl;
      if (typeof urlOrMapPropsToUrl === 'function') {
        reqUrl = urlOrMapPropsToUrl(this.props);
      }
      if (!reqUrl) throw new Error('provideApi: No URL specified');

      // Remove trailing slash
      if (reqUrl[0] === '/') reqUrl = reqUrl.slice(1);

      return reqUrl;
    }

    fetchUrl(url) {
      fetch(`/api/${url}`)
        .then(res => res.json())
        .then(res => {
          this.setState({ res, url });
        });
    }

    componentDidMount() {
      this.fetchUrl(this.getUrl());
    }

    componentWillReceiveProps() {
      let nextUrl = this.getUrl();
      if (nextUrl !== this.state.url) {
        this.fetchUrl(nextUrl);
      }
    }

    render() {
      const resProps = mapResToProps(this.state.res);
      return <Child {...this.props} {...resProps} />
    }
  }

  return ProvideApi;
};
