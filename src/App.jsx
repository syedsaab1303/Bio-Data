
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Switch,
  Box,
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import profile1 from './assets/profile1.jpg';
import profile2 from './assets/profile2.jpg';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPhotos, setShowPhotos] = useState(true);

  // const handleDownload = () => {
  //   const input = document.getElementById('biodata');
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const width = pdf.internal.pageSize.getWidth();
  //     const height = (canvas.height * width) / canvas.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  //     pdf.save('biodata.pdf');
  //   });
  // };



  const handleDownload = () => {
  const input = document.getElementById('biodata');

  // Expand full content for html2canvas
  const originalHeight = input.style.height;
  const originalOverflow = input.style.overflow;
  input.style.height = 'auto';
  input.style.overflow = 'visible';

  html2canvas(input, {
    scale: 2,
    scrollY: -window.scrollY,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Restore original styles
    input.style.height = originalHeight;
    input.style.overflow = originalOverflow;

    pdf.save('biodata.pdf');
  });
};




  const themeColors = {
    light: {
      background: '#ffffff',
      text: '#000000',
      border: '#d4af37',
    },
    dark: {
      background: '#1e1e1e',
      text: '#ffffff',
      border: '#d4af37',
    },
  };

  const theme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <Box
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Toggle Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography component="span" sx={{ mr: 1 }}>
              Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Box>
          <Box>
            <Typography component="span" sx={{ mr: 1 }}>
              Show Photos
            </Typography>
            <Switch
              checked={showPhotos}
              onChange={() => setShowPhotos(!showPhotos)}
            />
          </Box>
        </Box>

        {/* Biodata Card */}
        <Paper
          id="biodata"
          elevation={3}
          sx={{
            p: 4,
            border: `2px solid ${theme.border}`,
            borderRadius: '12px',
            backgroundColor: theme.background,
            color: theme.text,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: theme.border }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Typography>

          {/* Photos */}
          {showPhotos && (
            <Grid container spacing={4} sx={{ mt: 2 }} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Box
                  component="img"
                  src={profile1}
                  alt="Profile 1"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    border: `2px solid ${theme.border}`,
                    boxShadow: 3,
                    display: 'block',
                    mx: 'auto',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component="img"
                  src={profile2}
                  alt="Profile 2"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    border: `2px solid ${theme.border}`,
                    boxShadow: 3,
                    display: 'block',
                    mx: 'auto',
                  }}
                />
              </Grid>
            </Grid>
          )}

          {/* Personal Info */}
          <Box mt={4}>
            <Typography variant="h6">Name: Syed Tamzeed Ali</Typography>
            <Typography>Father's Name: Syed Sajjad Ali</Typography>
            <Typography>Father's Occupation: Retired Government Teacher</Typography>
            <Typography>Mother's Name: Ayesha Ansari</Typography>
            <Typography>Mother's Occupation: Government Teacher</Typography>
            <Typography>D.O.B: 13 March 1998 (Age: 27)</Typography>
            <Typography>Occupation: Software Engineer</Typography>
            <Typography>Height: 5.9 ft</Typography>
            <Typography>Religion: Muslim</Typography>
            <Typography>
              Education: B.Tech from Gov. IGEC College, Master's Diploma from CDAC Bangalore
            </Typography>
            <Typography>City: Betul, Madhya Pradesh</Typography>
            <Typography>Siblings: One younger brother, no sister</Typography>
            <Typography mt={2}>
              Partner Preferences: Practicing Muslimah aged 18 to 24 years,
              height between 5.2 to 5.6 ft, who performs 5 daily prayers, observes parda,
              and possesses high moral and character values.
            </Typography>
            <Typography mt={2}>Contact: +919754558869</Typography>
            <Typography>Father's Contact: +919806461673</Typography>
            <Typography>Mother's Contact: +919584101631 </Typography>
          </Box>

          {/* Download Button */}
          <Box mt={4} textAlign="center">
            <button
              onClick={handleDownload}
              style={{
                padding: '10px 20px',
                backgroundColor: theme.border,
                color: theme.text,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Download PDF
            </button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
