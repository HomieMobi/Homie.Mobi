// SignInWithGoogleButton.jsx
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust the path if necessary

const SignInWithGoogleButton = () => {
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User is signed in, you can redirect or handle the authentication state here
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={handleSignInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
