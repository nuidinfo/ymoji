import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import DefaultLayout from '../layouts/DefaultLayout';
import Input from '../components/Input';
import { signIn, signUp } from '../utils/api/user'; // Import signUp function
import { toast } from 'react-toastify';
import { auth } from './../App';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion'; // For animation

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(''); // For sign-up
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state

  // if (user) {
  //   navigate('/');
  // }

  const handleSignIn = async () => {
    const res = await signIn({ userName: username, password });
    if (res.error) return toast.error('Name or password is wrong');
    const { token, userID, userName } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName);
    setUser({ userName, token, userID });
  };

  const handleSignUp = async () => {
    const res = await signUp({ userName: username, password, status: status });
    if (res.error) return toast.error('Sign-up failed');
    toast.success('Sign-up successful! Please log in.');
    setIsSignUp(false); // Switch to login view after sign-up
  };
  const handleEmojiChange = (e) => {
    const input = e.target.value;

    // Regular expression to match a single emoji
    const emojiRegex = /^\p{Emoji}$/u;

    // Check if input is empty or a single emoji
    if (input === '' || emojiRegex.test(input)) {
      setStatus(input); // Update only if it’s an emoji or empty
    }
  };

  return (
    <DefaultLayout wrapperClassName='justify-center items-center shadow-lg'>
      <Card className='w-[50%]'>
        <CardHeader>
          <h1 className='text-center text-3xl'>
            {isSignUp ? '🌟📝' : '🧐👤❓'}
          </h1>
        </CardHeader>
        <div className='flex flex-col items-center p-3'>
          <Input
            className='w-full mb-2'
            type='text'
            value={username}
            placeholder='User name'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className='w-full mb-2'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <Input
              className='w-full mb-2'
              type='status'
              value={status}
              placeholder='Status'
              onChange={(e) => handleEmojiChange(e)}
            />
          )}
          <Button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            className='w-full text-xl'
          >
            {isSignUp ? '🚀' : '⛷️'}
          </Button>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className='mt-2 text-sm text-blue-500 hover:underline'
          >
            {isSignUp ? 'Already have an account? Log in' : 'New here? Sign up'}
          </button>
        </div>
      </Card>
    </DefaultLayout>
  );
}

export default Login;
