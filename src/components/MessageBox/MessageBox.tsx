import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

interface IMessageBox {
  title: string;
  message: string;
  linkTo?: string;
  lintTitle?: string;
  showImage?: boolean;
}

const MessageBox = ({
  title,
  message,
  linkTo,
  lintTitle,
  showImage = true,
}: IMessageBox) => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      flexGrow: 1,
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        px: 5,
        py: 14,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {showImage && (
        <Box
          sx={{
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <img src="/assets/errors/error-404.svg" alt="error" />
        </Box>
      )}

      <Typography align="center" sx={{ my: 2 }} variant="h3">
        {title}
      </Typography>
      <Typography align="center" color="text.secondary" variant="body2">
        {message}
      </Typography>
      {linkTo && (
        <Button to={linkTo} component={RouterLink} sx={{ mt: 2 }}>
          {lintTitle}
        </Button>
      )}
    </Container>
  </Box>
);

export default MessageBox;
