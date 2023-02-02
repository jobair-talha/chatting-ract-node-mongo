import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../features/auth/authSlice';

const Register = () => {
  const { message } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
    } else {
      setError('');
    }
    dispatch(register({ username, email, password, phone }));
  };

  return (
    <Container className="my-5">
      <h1 className="text-center">Register</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {message ? <Alert variant="danger">{message}</Alert> : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>
        <Link to="/login">Login</Link>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
