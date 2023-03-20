import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitClick = async () => {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();

    if (response.status === 400) {
      setMessage(body.message);
    } else if (response.ok) {
      setMessage('You have been successfully logged in');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'lightgray',
      }}
    >
      <div
        style={{
          margin: 'auto 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: 'white',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <div>{message}</div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={onSubmitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
