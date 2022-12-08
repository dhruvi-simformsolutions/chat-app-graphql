import React, { useState,useContext, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from "../utils/graphql";

function Login() {
  const context = useContext(AuthContext)
  const history = useNavigate();
  useEffect(()=>{
    if(context.user){
      history("/list")
    }
  },[context])
  
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result?.data?.login)
      history("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await loginUser();
    await setValues({
      username: "",
      password: ""
    });
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""} style={{marginTop: "20px"}}>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          required
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          required
          type="password"
        />
        <Button
          type="submit"
          color="teal"
          disabled={
            Object.values(values).some((element) => element === "")
          }
        >
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export default Login;
