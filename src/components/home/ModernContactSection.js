import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Paper, List, ListItem, InputAdornment, Snackbar, Alert } from '@mui/material';
import GreenLoadingButton from './GreenLoadingButton';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';

export default function ModernContactSection({ transparent = false }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  // honeypot anti-spam
  const [botField, setBotField] = useState('');

  // refs to focus first invalid field
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const emailRegex = /\S+@\S+\.\S+/;

  const validateInputs = (values) => {
    let isValid = true;
    let firstError = null;

    if (!values.name || values.name.trim().length < 1) {
      setNameError(true);
      setNameErrorMessage('Introduce tu nombre.');
      isValid = false;
      if (!firstError) firstError = 'name';
    } else if (values.name.length > 50) {
      setNameError(true);
      setNameErrorMessage('El nombre es demasiado largo.');
      isValid = false;
      if (!firstError) firstError = 'name';
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!values.email || !emailRegex.test(values.email.trim())) {
      setEmailError(true);
      setEmailErrorMessage('Introduce un email válido.');
      isValid = false;
      if (!firstError) firstError = 'email';
    } else if (values.email.length > 100) {
      setEmailError(true);
      setEmailErrorMessage('El email es demasiado largo.');
      isValid = false;
      if (!firstError) firstError = 'email';
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    const digits = (values.phone || '').replace(/[^\d]/g, '');
    if (!digits || digits.length < 7) {
      setPhoneError(true);
      setPhoneErrorMessage('Introduce un teléfono válido.');
      isValid = false;
      if (!firstError) firstError = 'phone';
    } else if (digits.length > 15) {
      setPhoneError(true);
      setPhoneErrorMessage('El teléfono es demasiado largo.');
      isValid = false;
      if (!firstError) firstError = 'phone';
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    return { isValid, firstError };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSnackbar((s) => ({ ...s, open: false }));

    const trimmed = {
      name: (form.name || '').trim(),
      phone: (form.phone || '').trim(),
      email: (form.email || '').trim(),
    };
      // Log form data before sending
      console.log('Submitting lead:', trimmed);

    const { isValid, firstError } = validateInputs(trimmed);
    if (!isValid) {
      setLoading(false);
      // focus first invalid field
      setTimeout(() => {
        if (firstError === 'name') nameRef.current?.focus();
        else if (firstError === 'phone') phoneRef.current?.focus();
        else if (firstError === 'email') emailRef.current?.focus();
      }, 0);
      return;
    }

    // Honeypot: if filled, silently succeed
    if (botField) {
      setLoading(false);
      setForm({ name: '', phone: '', email: '' });
      setSnackbar({ open: true, message: '¡Gracias! Te contactaremos pronto.', severity: 'success' });
      return;
    }

    setForm(trimmed);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      });
        // Log response object
        console.log('Response:', response);

      const data = await response.json().catch(() => null);
        // Log response data
        console.log('Response data:', data);

      if (response.ok) {
        setForm({ name: '', phone: '', email: '' });
        setNameError(false); setNameErrorMessage('');
        setEmailError(false); setEmailErrorMessage('');
        setPhoneError(false); setPhoneErrorMessage('');
        setSnackbar({ open: true, message: '¡Gracias! Te contactaremos pronto.', severity: 'success' });
      } else {
        const msg = (data && (data.message || data.error)) || 'Hubo un error. Inténtalo de nuevo más tarde.';
        setSnackbar({ open: true, message: msg, severity: 'error' });
      }
    } catch (err) {
        console.error('Error submitting lead:', err);
      setSnackbar({ open: true, message: err?.message || 'Hubo un error. Inténtalo de nuevo más tarde.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={transparent ? 0 : 4}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: transparent ? 0 : 8,
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        background: transparent ? 'rgba(255,255,255,0.15)' : '#f9f9f9',
        boxShadow: transparent ? 'none' : '0 4px 12px rgba(0,0,0,0.08)',
        backdropFilter: transparent ? 'blur(2px)' : undefined,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 1 }}>
        ✨ Activa tu Oficina Virtual en menos de 1 minuto
      </Typography>
      <Typography align="center" sx={{ color: '#555', mb: 3 }}>
        Déjanos tus datos y te contactamos sin compromiso.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="company"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          style={{ display: 'none' }}
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="organization"
          data-testid="honeypot"
        />

        <TextField
          fullWidth
          required
          name="name"
          //label="Nombre"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          error={nameError}
          helperText={nameErrorMessage}
          inputRef={nameRef}
          autoComplete="name"
          disabled={loading}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlined fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />

        <TextField
          fullWidth
          required
          name="phone"
          //label="Teléfono"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          error={phoneError}
          helperText={phoneErrorMessage}
          inputRef={phoneRef}
          autoComplete="tel"
          disabled={loading}
          type="tel"
          inputProps={{ inputMode: 'tel', pattern: '[0-9 +()\-]+' }}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneOutlined fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />

        <TextField
          fullWidth
          required
          name="email"
          //label="Email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailErrorMessage}
          inputRef={emailRef}
          autoComplete="email"
          disabled={loading}
          type="email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />

        <GreenLoadingButton
          label="SOLICITA TU OFICINA VIRTUAL"
          loading={loading}
          disabled={loading}
          sx={{ fontSize: '1rem' }}
        />
      </Box>

      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#666' }}>
        Al enviar aceptas el tratamiento de tus datos para contactarte.
      </Typography>

      <List sx={{ mt: 3, fontSize: 15, color: '#444', lineHeight: 1.6 }}>
        <ListItem disableGutters sx={{ p: 0 }}>
          <Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>
          Sin depósito ni permanencia
        </ListItem>
        <ListItem disableGutters sx={{ p: 0 }}>
          <Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>
          Respuesta automática
        </ListItem>
        <ListItem disableGutters sx={{ p: 0 }}>
          <Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>
          Precio fijo: 15€/mes
        </ListItem>
      </List>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          setSnackbar((s) => ({ ...s, open: false }));
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
