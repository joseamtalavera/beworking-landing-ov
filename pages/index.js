import React from 'react';
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
import GallerySection from '../src/components/home/GallerySection';
import Image from 'next/image';
import ModernContactSection from '../src/components/home/ModernContactSection';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Layout from '../src/components/Layout';
import Seo from '../src/components/Seo';
import StructuredData from '../src/components/StructuredData';
import orgData from '../src/components/structuredData/orgData';

export default function Home() {

  // Orange pointer icon for map markers
  const orangePin = {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    fillColor: '#FFA500',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    scale: 1.5,
    anchor: { x: 12, y: 24 },
  };

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
          <GreenButton label="Solicita tu oficina virtual" />
        </Box>
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

      {/* Google Reviews Carousel */}
      {/* <Box sx={{ py: 12 }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 3, fontWeight: 400, mt: 3 }}>
            Google Reviews
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
            Discover what our clients think and how BeWorking has boosted their businesses. Your experience could be the next success story!
          </Typography>
// ...existing code...
        </Container>
      </Box>

      <Divider sx={{ my: 4, borderColor: 'rgba(87, 84, 84, 0.3)', opacity: 1, borderBottomWidth: '0.5px' }} /> */}

      {/* Location Map Placeholder */}
      {/* <Box sx={{ py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h2" gutterBottom sx={{ mb: 3, fontWeight: 400, mt: 1 }}>
            BeSpaces Location
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
            Find your BeSpace in the best locations in Spain. Check the map to see where you can enjoy all our services and be part of the BeWorking community.
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
                {/*<Marker position={{ lat: 36.7213, lng: -4.4214 }} icon={orangePin} /> {/* Malaga */}
                {/* <Marker position={{ lat: 37.3886, lng: -5.9823 }} icon={orangePin} /> {/* Sevilla */}
                {/*<Marker position={{ lat: 39.4699, lng: -0.3763 }} icon={orangePin} /> {/* Valencia */}
                {/*<Marker position={{ lat: 41.6488, lng: -0.8891 }} icon={orangePin} /> {/* Zaragoza */}
                {/*<Marker position={{ lat: 43.2630, lng: -2.9350 }} icon={orangePin} /> {/* Bilbao */}
                {/*<Marker position={{ lat: 42.2406, lng: -8.7207 }} icon={orangePin} /> {/* Vigo */}
                {/*<Marker position={{ lat: 39.5696, lng: 2.6502 }} icon={orangePin} /> {/* Palma de Mallorca */}
                {/*<Marker position={{ lat: 28.1235, lng: -15.4363 }} icon={orangePin} /> {/* Las Palmas de Gran Canaria */}
                {/*<Marker position={{ lat: 41.3851, lng: 2.1734 }} icon={orangePin} /> {/* Barcelona */}
                {/*<Marker position={{ lat: 40.4168, lng: -3.7038 }} icon={orangePin} /> {/* Madrid */}
              {/* </GoogleMap>
            </LoadScript>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
          <GreenButton label="Select your BeSpace" />
        </Box>
        </Container>
      </Box>  */}

      {/* <Divider sx={{ my: 4, borderColor: 'rgba(87, 84, 84, 0.3))', opacity: 1, borderBottomWidth: '0.5px' }} /> */}

      {/* Interviews Section */}
      {/* <Box sx={{ py: 4, textAlign: 'center', bgcolor: '#fff' }}>
        <Container>
          <Typography variant="h2" align="center" sx={{ mb: 3, fontWeight: 400, mt: 3 }}>
            Interviews with our Coworkers
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
            Discover the stories and experiences of the professionals who are part of the BeWorking community.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>*/}
            {/* Example interview cards, replace with real data/images as needed */}
            {/* <Box sx={{ width: 280, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 3, boxShadow: 2, p: 3 }}>
              <Image src="/avatars/marta.jpg" alt="Marta García - Digital Marketing" width={120} height={120} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Marta García</Typography>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#FFA500' }}>Digital Marketing</Typography>
              <Typography variant="body2" color="text.secondary">
                &quot;BeWorking has allowed me to grow professionally and connect with other entrepreneurs. The flexibility and environment are unique.&quot;
              </Typography>
            </Box>
            <Box sx={{ width: 280, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 3, boxShadow: 2, p: 3 }}>
              <Image src="/avatars/luis.jpg" alt="Luis Martínez - Web Developer" width={120} height={120} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Luis Martínez</Typography>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#FFA500' }}>Web Developer</Typography>
              <Typography variant="body2" color="text.secondary">
                The BeWorking community is very active and there are always opportunities to collaborate. I recommend this space to all freelancers.
              </Typography>
            </Box>
            <Box sx={{ width: 280, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 3, boxShadow: 2, p: 3 }}>
              <Image src="/avatars/carmen.jpg" alt="Carmen Pérez - Administration" width={120} height={120} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Carmen Pérez</Typography>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#FFA500' }}>Administration</Typography>
              <Typography variant="body2" color="text.secondary">
                Thanks to BeWorking I have found the balance between my personal and professional life. The team support is excellent.
              </Typography>
            </Box>
            <Box sx={{ width: 280, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 3, boxShadow: 2, p: 3 }}>
              <Image src="/avatars/javier.jpg" alt="Javier Ruiz - Sales" width={120} height={120} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Javier Ruiz</Typography>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#FFA500' }}>Sales</Typography>
              <Typography variant="body2" color="text.secondary">
                The networking and monthly events have helped me expand my network and get new clients.
              </Typography>
            </Box> */}
            {/* Add more interview cards as needed */}
          {/*</Box>
        </Container>
      </Box> */}

      {/* Call to Action Section removed (form now in main section) */}

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