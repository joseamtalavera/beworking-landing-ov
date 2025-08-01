import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Divider,
  Link,
} from '@mui/material';
import {
  HeaderToolbar,
  MenuBox,
  MenuButton,
} from '../styles/indexStyles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NextLink from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      {/* Header */}
      <AppBar position="fixed" color="default" elevation={0} sx={{ top: 0, zIndex: 1201, bgcolor: '#fff', boxShadow: 1 }}>
        <Container disableGutters maxWidth={false} sx={{ pl: 5, pr: 5 }}>
          <HeaderToolbar disableGutters sx={{ display: 'flex', alignItems: 'center', pl: 0, pr: 0 }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pl: 0, ml: 0 }}>
              <NextLink href="/" passHref>
                <Typography variant="h4" sx={{ color: '#000', cursor: 'pointer', pl: 0, ml: 0 }}>
                  BeWorking
                </Typography>
              </NextLink>
            </Box>
            {/* <MenuBox>
              <MenuButton>Cowork</MenuButton>
              <MenuButton>Meeting Rooms</MenuButton>
              <MenuButton>BeCopilot</MenuButton>
              <MenuButton>Community</MenuButton>
              <Button
                href="/main/login"
                //variant="outlined"
                sx={{
                  color: '#009624',
                  borderColor: '#009624',
                  borderRadius: 0,
                  px: 3,
                  py: 1,
                  ml: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#007d3a',
                    color: '#007d3a',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Login | Register
              </Button>*/}
              {/* Language Switcher */}
            {/* </HeaderToolbar> */}
            {/*<Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
              <Button
                variant="text"
                sx={{ minWidth: 0, px: 1, fontWeight: 700, color: '#222', textDecoration: 'underline', textTransform: 'none' }}
                // onClick={() => handleLanguageChange('en')}
              >
                  EN
                </Button>
                <Typography variant="body2" sx={{ color: '#222', fontWeight: 700 }}>|</Typography>
                <Button
                  variant="text"
                  sx={{ minWidth: 0, px: 1, fontWeight: 700, color: '#222', textDecoration: 'none', textTransform: 'none' }}
                  // onClick={() => handleLanguageChange('es')}
                >
                  ES
                </Button>
              </Box>
            </MenuBox> */}
          </HeaderToolbar>
        </Container>
      </AppBar>
      {/* Main content */}
      <Box sx={{ pt: 14 }}>{children}</Box>
      {/* Footer */}
      <Box component="footer" sx={{ mt: 4, py: 4, bgcolor: '#009624', color: '#fff' }}>
        <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 6 }}>
          {/* BeWorking Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>BeWorking</Typography>
            <Link href="/main/index" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Inicio</Link>
            <Link href="/main/services" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Servicios</Link>
            <Link href="/main/about" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sobre Nosotros</Link>
            <Link href="/main/contact" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contacto</Link>
            <Link href="/main/index#precios" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Precios</Link>
            <Link href="/main/index#beSpaces" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Blog</Link>
          </Box>
          {/* BeSpaces Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>BeSpaces</Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Madrid</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Barcelona</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sevilla</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Valencia</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Bilbao</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Zaragoza</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Vigo</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Palma de Mallorca</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Las Palmas de Gran Canaria</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Málaga</Link>
          </Box>
          {/* Support Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Soporte</Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Ayuda</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>FAQ</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Inversores</Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Carreras</Link>
            <Link href="mailto:soporte@beworking.es" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>info@be-working.com</Link>
          </Box>
        </Container>
        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.3)', opacity: 1, borderBottomWidth: '0.5px' }} />
        <Container sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          {/* Left: BeWorking and legal links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="inherit">© 2025 BeWorking</Typography>
            <Link href="#" color="inherit" sx={{ ml: 2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              <Typography variant="body2" color="inherit">Términos</Typography>
            </Link>
            <Link href="#" color="inherit" sx={{ ml: 2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              <Typography variant="body2" color="inherit">Privacidad</Typography>
            </Link>
            <Link href="#" color="inherit" sx={{ ml: 2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              <Typography variant="body2" color="inherit">Sitemap</Typography>
            </Link>
          </Box>
          {/* Right: Language, currency, and social icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="inherit">English</Typography>
            <Typography variant="body2" color="inherit" >€ EUR</Typography>
            <Link href="#" color="inherit" aria-label="Instagram" sx={{ ml: 1 }}>
              <InstagramIcon sx={{ fontSize: 22, verticalAlign: 'middle' }} />
            </Link>
            <Link href="#" color="inherit" aria-label="Facebook" sx={{ ml: 1 }}>
              <FacebookIcon sx={{ fontSize: 22, verticalAlign: 'middle' }} />
            </Link>
            <Link href="#" color="inherit" aria-label="Twitter" sx={{ ml: 1 }}>
              <TwitterIcon sx={{ fontSize: 22, verticalAlign: 'middle' }} />
            </Link>
            <Link href="#" color="inherit" aria-label="LinkedIn" sx={{ ml: 1 }}>
              <LinkedInIcon sx={{ fontSize: 22, verticalAlign: 'middle' }} />
            </Link>
            <Link href="#" color="inherit" aria-label="YouTube" sx={{ ml: 1 }}>
              <YouTubeIcon sx={{ fontSize: 22, verticalAlign: 'middle' }} />
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}