import { Alert, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface NotificationAlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}
const NotificationAlert = ({
  message,
  type,
  onClose,
}: NotificationAlertProps) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        onClose={onClose}
        icon={<CheckIcon fontSize="inherit" />}
        severity={type}
      >
        {message}
      </Alert>
    </Stack>
  );
};

export default NotificationAlert;
