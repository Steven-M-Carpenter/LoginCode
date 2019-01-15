componentDidMount() {
  let readToken = window.localStorage.getItem("SMC_authkey");
  let query = {
    token: readToken
  };
  API.checkAuth(query)
    .then(res => {
      if (res.data.success) {
        this.setState({ isLoggedIn: true, });
      } else {
        this.setState({ isLoggedIn: false });
        window.location.assign('/login');
      };
    })
    .catch(err => console.log(err));
}