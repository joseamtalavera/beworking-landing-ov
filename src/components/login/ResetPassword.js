import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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
  borderRadius: 10,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 520,
    padding: theme.spacing(4),
  },
}));

const RoundedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
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

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [loading, setLoading] = useState(false);

 const validateInputs = () => {
  let valid = true;
  if (
    !password ||
    password.length < 8 ||
    !/(?=.*[a-z])/.test(password) ||
    !/(?=.*[A-Z])/.test(password) ||
    !/(?=.*\d)/.test(password) ||
    !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*/.test(password)
  ) {
    setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.');
    valid = false;
  } else {
    setPasswordError('');
  }
  if (password !== confirmPassword) {
    setConfirmError('Passwords do not match.');
    valid = false;
  } else {
    setConfirmError('');
  }
  return valid;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.text();
      if (response.ok) {
        setFormSuccess('Password reset successfully. You can now log in.');
        setTimeout(() => router.push('/main/login'), 2000);
      } else {
        setFormError(data || 'Reset failed. The link may be invalid or expired.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <RoundedTextField
          label="New Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
        />
        <RoundedTextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          error={!!confirmError}
          helperText={confirmError}
          fullWidth
        />
        {formError && <Typography color="error" sx={{ mt: 1 }}>{formError}</Typography>}
        {formSuccess && <Typography color="success.main" sx={{ mt: 1 }}>{formSuccess}</Typography>}
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 10, mt: 2, bgcolor: '#388e3c', color: '#fff', '&:hover': { bgcolor: '#2e7031' } }}
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </Box>
    </Card>
  );
}
