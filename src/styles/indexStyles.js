import { styled } from '@mui/material/styles';
import { Box, Container, Toolbar, Button } from '@mui/material';

// Main section background
export const MainSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: 'center',
  minHeight: 800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0)',
    zIndex: 1,
  },
}));

// Content inside main section
export const StartContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// Header toolbar
export const HeaderToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

// Menu box in header
export const MenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
}));

// Menu button in header
export const MenuButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
}));

// Section wrapper (for pilares, etc)
export const SectionBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

// Pricing banner
export const PricingBanner = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  textAlign: 'center',
  backgroundColor: '#fff',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 152, 0, 0.5)',
    zIndex: 1,
  },
}));

// The rest of the styled components, not directly used in index.js, are left below for other pages/components
export const PlansSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const FeaturesSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const ReviewsSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const MapSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: 'center',
}));

export const MapPlaceholder = styled(Box)(({ theme }) => ({
  height: 300,
  backgroundColor: '#ddd',
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Footer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  backgroundColor: '#333',
  color: '#fff',
}));

export const FooterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));
