import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import './form.css'
import axios from 'axios'

import {
  Button,
  TextField,
  Checkbox,
  Link,
  FormControlLabel,
} from "@material-ui/core";

class FormManual extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formError: '',
      formSuccess: ''
    }
  }

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = (event) => {
    this.setState({ open: false });
  };

  formSubmitHandler = (event) => {
    event.preventDefault()
    this.setState({ formError: '' })

    //Email Validation
    if (typeof this.state.email !== "undefined") {
      var emailPasswordRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!emailPasswordRegex.test(this.state.email)) {
        this.setState({ formError: "Enter Valid Email", open: true })
        return false
      }
    }

    //Password Validiton
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    if (strongRegex.test(this.state.password)) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ formError: 'Passwrod and Confirm password should match.', open: true })
        return false
      }
    } else {
      this.setState({ formError: 'Enter Strong Password', open: true })
      return false
    }

    //save to database
    const API = "http://localhost/singup-interview/registrtion.php";
    let formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    axios.post(API, formData).then(
      (res) => {
        const responseMsg = res.data
        if (responseMsg.success === 1) {
          this.setState({ formSuccess: "SingUp Successfully", open: true })
        }
      }).catch((error) => {
        this.setState({ formError: "Something Went Wrong", open: true })
      }
      );
  }

  render() {
    return (
      <div className='form-main'>
        <div className="form-container">
          <form onSubmit={this.formSubmitHandler}>
            <TextField onChange={this.inputHandler} className="form-input" autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />

            <TextField onChange={this.inputHandler} className="form-input" variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />

            <TextField onChange={this.inputHandler} className="form-input" variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />

            <TextField onChange={this.inputHandler} className="form-input" variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />

            <TextField onChange={this.inputHandler} className="form-input" variant="outlined" required fullWidth name="confirmPassword" label="Confirm-Password" type="password" id="confirm-password" autoComplete="current-password" />

            <div style={{ marginLeft: '10px' }}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </div>

            <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: "10px" }}>
              Sign Up
          </Button>

            <Link href="#" variant="body2" style={{ float: 'right' }}>
              Already have an account? Sign in
          </Link>
          </form>
        </div>


        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity={this.state.formError === '' ? 'success' : 'error'}>
            {this.state.formError === '' ? this.state.formSuccess : this.state.formError}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default FormManual
