import React from 'react';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material';

export default function GreenLoadingButton({ label = 'Solicitar información', loading = false, sx = {}, ...props }) {
  const theme = useTheme();

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingPosition="center"
      startIcon={<SendIcon />}
      fullWidth
      sx={{
        mt: 3,
        bgcolor: '#009624',
        '&:hover': { bgcolor: theme.palette.success.dark },
        maxWidth: 480,
        width: '100%',
        mx: 'auto',
        textTransform: 'none',
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    >
      {label}
    </LoadingButton>
  );
}
