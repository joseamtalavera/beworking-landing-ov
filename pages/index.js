import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Divider,
} from '@mui/material';
import { 
  MainSection, 
  StartContent, 
  SectionBox, 
  PricingBanner, 
} from '../src/styles/indexStyles';
import { PricingCard } from '../src/components/home/PricingCard';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PilarSection from '../src/components/home/PilarSection';
import GreenButton from '../src/components/home/GreenButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import GallerySection from '../src/components/home/GallerySection';
import Image from 'next/image';
import ModernContactSection from '../src/components/home/ModernContactSection';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Layout from '../src/components/Layout';
import Seo from '../src/components/Seo';
import StructuredData from '../src/components/StructuredData';
import orgData from '../src/components/structuredData/orgData';


export default function Home() {
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
    setTimeout(() => {
      setOpenContact(false);
    }, 3000);
  };

  const handleCloseContact = () => setOpenContact(false);

  return (
    <Layout>
      <Seo
        title="BeWorking - Coworking & Office Spaces"
        description="Flexible coworking and office solutions in Spain. Join BeWorking today!"
        image="/BeWorking.JPG"
        url="https://beworking.com"
      />
      <StructuredData data={orgData} />
      {/* Main */}
      <MainSection sx={{ pt: { xs: 4, sm: 4 }, mt: -6 }}>
        <StartContent maxWidth="md" sx={{ pt: { xs:8, sm:10, md:10 }, ml: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
            Tu Oficina Virtual por <span style={{ fontWeight: 'bold' }}>15 €/mes</span>
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'left' }}>
             Concéntrate en tu negocio — nosotros nos encargamos del resto.<br />
            {/* <span style={{ fontWeight: 400, fontSize: '2rem', color: 'white', textAlign: 'left', display: 'block' }}>
              Concéntrate en tu negocio — nosotros nos encargamos del resto.
            </span> */}
          </Typography>
          {/* <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto', mb: 4 }}>
            <GreenButton label="Solicita tu oficina virtual" />
          </Box> */}
          {/* Contact Form moved here */}
          <Box sx={{ maxWidth: 600, width: '100%', ml: 0, mr: 'auto' }}>
            <ModernContactSection transparent />
          </Box>
        </StartContent>
      </MainSection>

      {/* Pilares section */}
      <SectionBox>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 400, mt: 12, color: '#009624' }}>
        Nuestros Beneficios
        </Typography>
        <Typography variant="h2" align="center" sx={{ mb: 3, fontWeight: 400, mt: 3 }}>
        Oficina Virtual BeWorking
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 16, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
        Descubre nuestro modelo de Oficina Virtual, basado en 5 pilares fundamentales que te ofrecen mucho más que una simple dirección. 
          ¡Conócelos todos y lleva tu negocio al siguiente nivel!
        </Typography>

        <PilarSection
          title="Domicilio Legal y Fiscal"
          image="/pilar1.2final.png"
          description="Te ofrecemos un domicilio legal y fiscal en múltiples ubicaciones."
          benefits={[
            'Cumple con los requisitos legales y fiscales.',
            <>Ubicación visible en <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Google Maps</Box>. Mantén tu privacidad sin usar tu dirección personal.</>,
          ]}
        />

        <Box sx={{ bgcolor: '#f9f9f9' }}>
          <Box sx={{ height: { xs: 120, md: 200 } }} />
          <PilarSection
            title="Recepción de Paquetería y Correspondencia"
            image="/pilar2final.png"
            description="Tu correspondencia siempre atendida: recibimos tu correo y paquetes."
            benefits={[
              <>En cuanto recibimos tu correspondencia, te avisamos por email o <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>WhatsApp</Box>.</>,
              <>Escaneo gratuito de cartas y archivo en la <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>SuperApp</Box>.</>,
              'Recogida de paquetes en horario ampliado.',
            ]}
            reverse
          />
        </Box>

        <Box sx={{ height: { xs: 120, md: 200 } }} />

        <PilarSection
          title="Acceso a la red física BeSpaces"
          image="/pilar3final.png"
          description="Utiliza nuestra red de espacios de trabajo sin coste adicional."
          benefits={[
            <>No solo te ofrecemos el servicio virtual, sino también la <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Oficina Física</Box> y <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Sala de Reuniones</Box> cuando las necesites.</>,
            'Todos estos espacios pertenecen a BeWorking.',
            'Aprovecha y conecta con emprendedores y freelancers.',
          ]}
        />

        <Box sx={{ bgcolor: '#f9f9f9' }}>
          <Box sx={{ height: { xs: 120, md: 200 } }} />
          <PilarSection
            title="Uso gratuito de la SuperApp"
            image="/pilar4.1final.png"
            description="Todas las herramientas de gestión empresarial incluidas en tu plan de Oficina Virtual."
            benefits={[
              <>Contactos, <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>MailBox</Box> donde archivamos toda tu correspondencia, Contabilidad, Chat para conectar con otros Beworkers.</>,
              <>También tienes un motor de <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Reservas Gratuito</Box> para usar nuestros espacios.</>,
              <>Y la posibilidad de crear módulos personalizados y usar toda la <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Red de Partners</Box> de servicios BeWorking.</>,
              'Acceso disponible desde cualquier dispositivo.',
            ]}
            reverse
          />
        </Box>

        <Box sx={{ height: { xs: 120, md: 200 } }} />

        <PilarSection
          title="Eventos Mensuales y Networking"
          image="/pilar5final.png"
          description="Participa en reuniones, talleres y cafés empresariales."
          benefits={[
            <>Cada mes, los gestores de BeSpaces organizarán <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Eventos Presenciales</Box>.</>,
            'Así podrás conocer a otros Beworkers y crear sinergias.',
            <>Forma parte de una <Box component="span" sx={{ fontWeight: 'bold', color: 'black' }}>Comunidad activa y en crecimiento</Box>.</>,
          ]}
        />
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <GreenButton label="Solicita tu oficina virtual" onClick={handleOpenContact} />
        </Box>

        {/* Contact Popup Dialog */}
        <Dialog open={openContact} onClose={handleCloseContact} maxWidth="sm" fullWidth>
          <DialogContent sx={{ p: 4 }}>
            <ModernContactSection transparent onClose={handleCloseContact} />
          </DialogContent>
        </Dialog>
      </SectionBox>

      {/* Pricing Banner */}
      <PricingBanner>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ mb: 3, fontWeight: 400, mt: 3, color: 'white' }}
            >
            Precios
          </Typography>
          <Typography 
            variant="h5"
            align="center"
            sx={{ mb: 16, maxWidth: 900, mx: 'auto', color: 'white' }}
          >
            <Box component="span" sx={{ fontWeight: 'bold' }}>Únete</Box> a BeWorking y transforma la forma en que haces negocios. Da el salto al futuro y potencia tu empresa. ¡Deja que tu éxito comience hoy!
          </Typography>
          {/* Pricing Card injected here */}
          <PricingCard />
        </Container>
      </PricingBanner>

      {/* Gallery Section */}
      <GallerySection />


      {/* Floating WhatsApp Button */}
      <Box
        component="a"
        href="https://wa.me/34666666666" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          bgcolor: 'transparent',
          borderRadius: 0,
          transition: 'box-shadow 0.2s',
          '&:hover': {
            boxShadow: 'none',
            bgcolor: 'transparent',
          },
        }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon sx={{ color: '#25D366', fontSize: 70 }} />
      </Box>
    </Layout>
  )
}