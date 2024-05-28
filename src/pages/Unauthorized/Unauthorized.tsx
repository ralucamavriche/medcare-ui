import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Container, Typography } from '@mui/material';

const Unauthorized = () => (
  <>
    <Helmet>
      <title>
        Error: Unauthorized
      </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.paper',
        flexGrow: 1
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: 5,
          py: 14,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <img src="/assets/errors/error-404.svg" alt="error" />
        </Box>
        <Typography
          align="center"
          sx={{ my: 2 }}
          variant="h3"
        >
          Ooops! Not allowed. Don't have rights
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
        >
          You don't have right to access this page!
        </Typography>
        <Button
          to="/"
          component={RouterLink}
          sx={{ mt: 2 }}
        >
          Take me home
        </Button>
      </Container>
    </Box>
  </>
);

export default Unauthorized;