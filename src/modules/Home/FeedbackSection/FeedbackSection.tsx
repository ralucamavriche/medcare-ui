import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

interface FeedbackInterface {
  author: string;
  description: string;
  rating: number;
}

interface FeedbackSectionProps {
  feedback: FeedbackInterface;
}

const FeedbackSection = (props: FeedbackSectionProps) => {
  const { feedback } = props;

  const renderStarRating = () => {
    return new Array(5).fill(undefined).map((_element, idx) => {
      const color = idx <= feedback.rating ? "yellow.500" : "neutral.200";
      return (
        <SvgIcon fontSize="medium">
          <StarRateIcon
            sx={{
              color,
            }}
          />
        </SvgIcon>
      );
    });
  };

  return (
    <Card>
      <CardContent>
        <Box
          component={"div"}
          sx={{
            textAlign: "left"
          }}
        >
          {renderStarRating()}
        </Box>
        <Typography align="left" variant="body1" sx={{
          my: 2,
          color: "neutral.700"
        }}>
          {feedback.description}
        </Typography>
        <Divider />
        <Stack spacing={2} sx={{ pt: 2 }}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography color="text.secondary" display="inline" variant="body1">
              {feedback.author}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
