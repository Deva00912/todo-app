import React, { Component } from "react";
import Button from "../Button/Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="display-flex flex-direction-column align-item-center justify-content-center color-white height-inherit width-inherit ">
          <div className="font-size-38px ">Something went wrong!</div>
          <Button onClick={this.props.logoutOnClick} value="Logout" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
