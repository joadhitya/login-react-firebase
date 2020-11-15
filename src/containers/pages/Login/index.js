import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { history } = this.props;
    const { email, password } = this.state;
    const res = await this.props
      .loginAPI({
        email,
        password,
      })
      .catch((err) => console.err);

    if (res) {

      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("login galgal");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login</p>
          <input
            className="input"
            id="email"
            placeholder="Email"
            type="text"
            value={this.state.email}
            onChange={this.handleChangeText}
          />
          <input
            className="input"
            id="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChangeText}
          />
          <Button
            onClick={this.handleLoginSubmit}
            title="Login"
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
