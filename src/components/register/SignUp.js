import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, SitemarkIcon } from '../login/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: 520,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  borderRadius: 10, // More rounded corners for the card
  [theme.breakpoints.up('sm')]: {
    maxWidth: 520,
    padding: theme.spacing(4),
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

// Add a custom style for TextField to make input fields more rounded
const RoundedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10, // More rounded input fields
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#ff9800',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff9800',
    },
  },
}));

/* const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
})); */

//export default function SignUp(props) 
export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [formMessage, setFormMessage] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [termsError, setTermsError] = React.useState(false);
  const [termsErrorMessage, setTermsErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const confirmPasswordInput = document.getElementById('confirm-password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Full name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!confirmPasswordInput.value || confirmPasswordInput.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }
    
    if (!termsAccepted) {
      setTermsError(true);
      setTermsErrorMessage('You must accept the terms and conditions.');
      isValid = false;
    } else {
      setTermsError(false);
      setTermsErrorMessage('');
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage('');
    setFormSuccess(false);
    if (!validateInputs()) return;
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log('SignUp.js register payload:', payload); // Debug: log payload
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log('SignUp.js register response:', result); // Debug: log response
      if (response.ok) {
        setFormSuccess(true);
        setFormMessage('Account created successfully. You can now log in.');
        // Reset form fields on successful registration
        setPassword('');
        setConfirmPassword('');
        setTermsAccepted(false);
        setTermsError(false);
        setTermsErrorMessage('');
        // Also reset name and email fields
        if (document.getElementById('name')) document.getElementById('name').value = '';
        if (document.getElementById('email')) document.getElementById('email').value = '';
        setEmailError(false);
        setEmailErrorMessage('');
        setPasswordError(false);
        setPasswordErrorMessage('');
        setNameError(false);
        setNameErrorMessage('');
        setConfirmPasswordError(false);
        setConfirmPasswordErrorMessage('');
        setTermsError(false);
        setTermsErrorMessage('');
        // Optionally reset name/email fields if you want
        // document.getElementById('name').value = '';
        // document.getElementById('email').value = '';
      } else {
        setFormSuccess(false);
        setFormMessage(result.message || 'Error creating account.');
      }
    } catch (error) {
      setFormSuccess(false);
      setFormMessage('Network error.');
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', alignSelf: 'center' }}
      >
        Create Account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {formMessage && (
          <Typography color={formSuccess ? 'success.main' : 'error'} sx={{ mb: 1, textAlign: 'center' }}>{formMessage}</Typography>
        )}
        <FormControl>
          <FormLabel htmlFor="name" sx={{ color: 'text.primary', fontWeight: 500 }}>Full Name</FormLabel>
          <RoundedTextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            error={nameError}
            helperText={nameErrorMessage ? nameErrorMessage.replace('Name is required.', 'Full name is required.') : ''}
            color={nameError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email" sx={{ color: 'text.primary', fontWeight: 500 }}>Email</FormLabel>
          <RoundedTextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage ? emailErrorMessage.replace('Por favor ingresa un correo electrónico válido.', 'Please enter a valid email address.') : ''}
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" sx={{ color: 'text.primary', fontWeight: 500 }}>Password</FormLabel>
          <RoundedTextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage ? passwordErrorMessage.replace('La contraseña debe tener al menos 6 caracteres.', 'Password must be at least 6 characters long.') : ''}
            color={passwordError ? 'error' : 'primary'}
            value={typeof password !== 'undefined' ? password : ''}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirm-password" sx={{ color: 'text.primary', fontWeight: 500 }}>Confirm Password</FormLabel>
          <RoundedTextField
            required
            fullWidth
            name="confirm-password"
            placeholder="••••••"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            variant="outlined"
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage ? confirmPasswordErrorMessage.replace('Las contraseñas no coinciden.', 'Passwords do not match.') : ''}
            color={confirmPasswordError ? 'error' : 'primary'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} color="primary" />}
          label={<span>I have read and accept the <Link href="/main/terminos" target="_blank" rel="noopener" sx={{ fontWeight: 700, textDecoration: 'none', color: 'primary.main' }}>terms and conditions</Link>.</span>}
        />
        {termsError && (
          <Typography color="error" sx={{ fontSize: '0.9rem', mb: -1, mt: -1 }}>{termsErrorMessage ? termsErrorMessage.replace('Debes aceptar los términos y condiciones.', 'You must accept the terms and conditions.') : ''}</Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          sx={{ bgcolor: '#009624', '&:hover': { bgcolor: '#007d3a' } }}
        >
          Create Account
        </Button>
      </Box>
      {/* <Divider>or</Divider> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
       {/*  <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign up with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button> */}
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            href="/main/login"
            //variant="body2"
            sx={{ alignSelf: 'center', textDecoration: 'none', fontWeight: 700 }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}