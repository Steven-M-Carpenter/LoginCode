

handleInputChange = event => {
  const value = event.target.value;
  const name = event.target.name;
  this.setState({
    [name]: value
  });
  console.log("name = " + name);
  console.log("value = " + value);
};


handleFormSubmit = event => {
  event.preventDefault();
  this.validateUser({
    email: this.state.loginEmail,
    password: this.state.loginPassword
  });
  console.log("state = " + JSON.stringify(this.state));
};


validateUser = query => {
  API.getUser(query)
    .then(res => {
      console.log("LOGIN: res = " + JSON.stringify(res));
      if (res.data.success) {
        console.log("in success handle");
        this.setState({ isLoggedIn: true, });
        this.setState({ loginMsg: res.data.message });
        window.localStorage.setItem("SMC_authkey", res.data.token);
        window.location.assign('/authenticated/main');
      } else {
        console.log("in failure handle");
        this.setState({ isLoggedIn: false });
        this.setState({ loginMsg: res.data.message });
        window.localStorage.setItem("SMC_authkey", "");
        window.location.assign('/login');
      }
      console.log("LOGIN: state = " + JSON.stringify(this.state));
    })
    .catch(err => console.log(err));
};

