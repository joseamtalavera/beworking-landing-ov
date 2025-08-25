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
// import Image from 'next/image';
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
  const [openBanner, setOpenBanner] = useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
    setTimeout(() => {
      setOpenContact(false);
    }, 3000);
  };

  const handleCloseContact = () => setOpenContact(false);

    const orangePin = {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    fillColor: '#FFA500',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    scale: 1.5,
    anchor: { x: 12, y: 24 },
  };

  const handlePinClick = () => setOpenBanner(true);
  const handleBannerClose = () => setOpenBanner(false);

  return (
    <Layout>
      <Seo
        title="Oficina Virtual BeWorking - Tu dirección profesional desde 15€/mes"
        description="Obtén tu oficina virtual con domicilio legal y fiscal, recepción de paquetería, acceso a espacios físicos, SuperApp y eventos de networking. ¡Impulsa tu negocio con BeWorking! Desde 15€/mes."
        image="/BeWorking.JPG"
        url="https://beworking.com"
      />
      <StructuredData data={orgData} />
      {/* Main */}
      <Box sx={{ position: 'relative', pt: { xs: 4, sm: 4 }, mt: -6, minHeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Optimized background image */}
          <Image
            src="/3_retina.webp"
            alt="Main background"
            fill
            style={{ objectFit: 'cover', zIndex: 0 }}
            priority
          />
        <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
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
        </Box>
      </Box>

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
              image="/pilar1.2final_optimized.webp"
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
                image="/pilar2final_optimized.webp"
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
              image="/pilar3final_optimized.webp"
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
                image="/pilar4.1final_optimized.webp"
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
              image="/pilar5final_optimized.webp"
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
      <Box sx={{ position: 'relative', pt: 12, pb: 12, textAlign: 'center', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
        {/* Optimized background image */}
        <Image
          src="/BeWorking.JPG"
          alt="Pricing background"
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        {/* Orange overlay */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(255, 152, 0, 0.5)', zIndex: 1 }} />
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
      </Box>

      {/* Gallery Section */}
      <GallerySection />

      {/* Location Map Placeholder */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h2" gutterBottom sx={{ mb: 3, fontWeight: 400, mt: 1 }}>
            BeSpaces Location
          </Typography>

          <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
            Haz clic en el mapa para ver dónde puedes disfrutar de todos nuestros servicios y formar parte de la comunidad BeWorking.
          </Typography>
          <Box
            sx={{
              height: 500,
              backgroundColor: '#ddd',
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
            }}
          >
            <LoadScript googleMapsApiKey="AIzaSyD2wGD__sSA7AEkqMm-9pmKDITc6jivP6o">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={{ lat: 40.4637, lng: -3.7492 }} // Spain central
                zoom={5}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                <Marker 
                  position={{ lat: 36.7213, lng: -4.4214 }} 
                  icon={orangePin} 
                  onClick={handlePinClick}
                /> {/* Malaga */}
          {/* Banner for Málaga pin */}
          <Dialog open={openBanner} onClose={handleBannerClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 2, bgcolor: '#fff', boxShadow: 3 } }}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Image src="/DSC_2298.jpg" alt="BeSpace Málaga" width={320} height={180} style={{ borderRadius: 12, objectFit: 'cover' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>BeSpace Málaga</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Calle Alejandro Dumas 17 - Oficinas, 29005 Málaga, España
              </Typography>
              <GreenButton label="Cerrar" onClick={handleBannerClose} />
            </DialogContent>
          </Dialog>
                {/*<Marker position={{ lat: 37.3886, lng: -5.9823 }} icon={orangePin} /> {/* Sevilla */}
                {/* <Marker position={{ lat: 39.4699, lng: -0.3763 }} icon={orangePin} /> {/* Valencia */}
                {/*<Marker position={{ lat: 41.6488, lng: -0.8891 }} icon={orangePin} /> {/* Zaragoza */}
                {/*<Marker position={{ lat: 43.2630, lng: -2.9350 }} icon={orangePin} /> {/* Bilbao */}
                {/*<Marker position={{ lat: 42.2406, lng: -8.7207 }} icon={orangePin} /> {/* Vigo */}
                {/*<Marker position={{ lat: 39.5696, lng: 2.6502 }} icon={orangePin} /> {/* Palma de Mallorca */}
                {/*<Marker position={{ lat: 28.1235, lng: -15.4363 }} icon={orangePin} /> {/* Las Palmas de Gran Canaria */}
                {/*<Marker position={{ lat: 41.3851, lng: 2.1734 }} icon={orangePin} /> {/* Barcelona */}
                {/*<Marker position={{ lat: 40.4168, lng: -3.7038 }} icon={orangePin} /> {/* Madrid */}
              </GoogleMap>
            </LoadScript>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
          <GreenButton label="Select your BeSpace" />
        </Box>
        </Container>
      </Box>


      {/* Floating WhatsApp Button */}
      <Box
        component="a"
        href="https://wa.me/34640369759" 
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