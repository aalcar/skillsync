import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/profile');
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // this does everytihng for us basically lol
      // mildly annoying that it requires an email but oh well
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up:", userCred.user);
      navigate('/profile');
      // make the error message not be goofy firebase errors 
    } catch (err) {
      // default msg if switch falls through everything
      let msg = "Something went wrong";

      switch (err.code) {
        case "auth/email-already-in-use":
          msg = "That email is already in use.";
          break;
        case "auth/invalid-email":
          msg = "Please enter a valid email.";
          break;
        case "auth/weak-password":
          msg = "Password is too short. It should be at least 6 characters.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password.";
          break;
        }

      setError(msg);
      handleLogin();
    }

    setLoading(false);
  };

  return (
    // garbage rn
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
