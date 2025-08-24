import React, { useState } from 'react';
import { Box, Typography, IconButton, Dialog, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GreenButton from './GreenButton';

const images = [
  '/_MG_1510_optimized.webp',
  '/_MG_1521_optimized.webp',
  '/_MG_1541_optimized.webp',
  '/DSC_2247 (Mediano)_optimized.webp',
  '/DSC_2260 (Mediano)_optimized.webp',
  '/DSC_2281 (Mediano)_optimized.webp',
  '/DSC_2281_optimized.webp',
  '/DSC_2298_optimized.webp',
  '/DSC_2312 (Mediano)_optimized.webp',
  '/DSC_2660_optimized.webp',
  '/DSC_2665_optimized.webp',
  '/DSC_2673_optimized.webp',
  '/DSC_2677_optimized.webp',
  '/DSC_2684_optimized.webp',
  '/DSC_2689_optimized.webp',
  '/DSC_2691_optimized.webp',
  '/DSC_2697_optimized.webp'
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start at first image
  const [open, setOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null); // For modal image
  const imagesPerPage = 4;

  // For modal navigation (single image)
  const handleNext = () => {
    setModalIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setModalIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // For gallery navigation (set of images)
  const handleGalleryNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + imagesPerPage) % images.length);
  };

  const handleGalleryPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - imagesPerPage + images.length) % images.length);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const visibleImages = [
    ...images.slice(currentIndex, currentIndex + imagesPerPage),
    ...images.slice(0, Math.max(0, currentIndex + imagesPerPage - images.length)),
  ];

  return (
    <Box sx={{ py: 8, textAlign: 'center', bgcolor: '#f9f9f9' }}>
      <Typography variant="h2" align="center" sx={{ mb: 3, fontWeight: 400, mt: 3 }}>
        Galería de Imágenes
      </Typography>
      <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
        Explora nuestra galería para descubrir más sobre nuestos BeSpaces y servicios.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', py: 4 }}>
        <IconButton onClick={handleGalleryPrev} sx={{ position: 'absolute', left: 16, zIndex: 2, color: '#009624', fontSize: '2rem' }}>
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>

        <Box
          sx={{ display: 'flex', gap: 2, transition: 'transform 0.3s ease-in-out', justifyContent: 'center', alignItems: 'center' }}
        >
          {visibleImages.map((src, index) => {
            // Calculate the global index for the image
            const globalIndex = (currentIndex + index) % images.length;
            return (
              <Box
                key={index}
                component="img"
                src={src}
                alt={`Gallery image ${globalIndex + 1}`}
                onClick={() => { setModalIndex(globalIndex); }}
                sx={{
                  width: '20%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 2,
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Box>

        <IconButton onClick={handleGalleryNext} sx={{ position: 'absolute', right: 16, zIndex: 2, color: '#009624', fontSize: '2rem' }}>
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      </Box>

      <Box sx={{ mt: 4 }}>
        <GreenButton label="Ver todas las imágenes" onClick={handleOpen} />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
          <Box sx={{ p: 4, position: 'relative' }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 16, right: 16, color: 'grey.500' }}
            >
              ✕
            </IconButton>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
              {images.map((src, index) => (
                <Grid span={3} key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    onClick={() => setModalIndex(index)}
                    sx={{
                      width: '100%',
                      height: 160,
                      objectFit: 'cover',
                      borderRadius: 1,
                      boxShadow: 1,
                      display: 'block',
                      mx: 'auto',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Dialog>
      </Box>

      {modalIndex !== null && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,0.85)',
          zIndex: 1401,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <IconButton
            onClick={() => setModalIndex(null)}
            sx={{ position: 'absolute', top: 24, right: 24, color: 'white', zIndex: 2 }}
          >
            ✕
          </IconButton>
          <Box
            component="img"
            src={images[modalIndex]}
            alt={`Gallery image ${modalIndex + 1}`}
            sx={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 2,
              boxShadow: 4,
              mb: 2,
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <IconButton onClick={handlePrev} sx={{ color: '#009624', fontSize: '2rem' }}>
              <ArrowBackIosIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ color: '#009624', fontSize: '2rem' }}>
              <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}