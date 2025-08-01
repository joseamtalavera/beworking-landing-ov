import React from 'react';
import { Box, Typography, TextField, Grid, Paper, List, ListItem } from '@mui/material';
import GreenButton from './GreenButton';

export default function ModernContactSection({ transparent = false }) {
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
      <Box component="form">
        <TextField
          fullWidth
          required
          placeholder="Nombre completo"
          variant="outlined"
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />
        <TextField
          fullWidth
          required
          placeholder="Teléfono"
          type="tel"
          variant="outlined"
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />
        <TextField
          fullWidth
          required
          placeholder="Email"
          type="email"
          variant="outlined"
          sx={{ mb: 2, background: '#fff', borderRadius: 1 }}
        />
        <GreenButton
          type="submit"
          sx={{ mt: 2, mb: 1 }}
        />
      </Box>
      <List sx={{ mt: 3, fontSize: 15, color: '#444', lineHeight: 1.6 }}>
        <ListItem disableGutters sx={{ p: 0 }}><Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>Sin dépoisto o permanencia</ListItem>
        <ListItem disableGutters sx={{ p: 0 }}><Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>Respuesta automática</ListItem>
        <ListItem disableGutters sx={{ p: 0 }}><Box component="span" sx={{ color: '#009624', fontWeight: 'bold', mr: 1 }}>✓</Box>Precio fijo: 15€/mes</ListItem>
      </List>
    </Paper>
  );
}
