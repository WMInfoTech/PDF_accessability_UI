import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

// MUI Components
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// MUI Icons
import LoginIcon from '@mui/icons-material/Login';

// Styled Components
import { styled } from '@mui/system';

const WMGreen = '#115740';
const WMGold = '#B9975B';
const WMGray = '#F5F5F5';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  border: `2px solid ${WMGreen}`,
  borderRadius: theme.spacing(1),
  minHeight: '200px',
}));

const LandingPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isLoading) return;
    if (auth.isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      auth.signinRedirect();
    }, 500);
  };

  if (auth.isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: WMGray,
        }}
      >
        <CircularProgress size={50} thickness={5} sx={{ color: WMGreen }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: WMGray,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          backgroundColor: WMGreen,
          height: '80px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          William & Mary
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: WMGreen,
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            PDF Accessibility Remediation Tool
          </Typography>

          {/* Login Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={loading ? null : <LoginIcon />}
            onClick={handleSignIn}
            disabled={loading}
            sx={{
              backgroundColor: WMGreen,
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 6,
              py: 2,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#0d4230',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
              },
              '&:disabled': {
                backgroundColor: '#7a9d8f',
                color: '#fff',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Login to Remediate PDF'
            )}
          </Button>

          {/* Announcements Box */}
          <StyledPaper elevation={3} sx={{ width: '100%', maxWidth: '800px', mt: 2 }}>
            <Box
              sx={{
                borderBottom: `3px solid ${WMGold}`,
                pb: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  color: WMGreen,
                  fontWeight: 'bold',
                }}
              >
                Announcements & Information
              </Typography>
            </Box>

            <Box sx={{ color: '#333' }}>
              <Typography variant="body1" paragraph>
                Welcome to the William & Mary PDF Accessibility Remediation Tool. This service helps ensure your PDF documents meet accessibility standards.
              </Typography>

              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                For questions or support, please contact <a href="mailto:support@wm.edu">support</a>.
              </Typography>
            </Box>
          </StyledPaper>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: WMGreen,
          color: '#fff',
          py: 3,
          mt: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} William & Mary
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
