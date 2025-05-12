import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

// its literally the same as the signup except the firebase function is signIn instead of createUser
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    // make the error message not be goofy firebase errors 
    } catch (err) {
      // default msg if switch falls through everything
      let msg = "Something went wrong";

      switch (err.code) {
        case "auth/invalid-email":
          msg = "Please enter a valid email.";
          break;
        case "auth/user-not-found":
          msg = "No account with that email.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password.";
          break;
      }

      setError(msg);
        }
  };

  return (
    // garbage rn
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default SignIn;
