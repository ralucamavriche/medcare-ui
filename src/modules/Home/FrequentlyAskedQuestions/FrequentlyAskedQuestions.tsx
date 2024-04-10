import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const questions = [
  {
    id: 1,
    question: "Is my personal information secure when using this app?",
    answer:
      "Yes, we prioritize the security and privacy of your information. Our app employs industry-standard encryption and security measures to ensure your data is safe and confidential.",
  },
  {
    id: 2,
    question: "How do I cancel or reschedule an appointment?",
    answer:
      "To cancel or reschedule an appointment, log in to the app, go to your scheduled appointments, and follow the prompts to make the necessary changes. Ensure you do this within the specified timeframe to avoid any inconvenience.",
  },
  {
    id: 3,
    question: "Are there any fees for using the appointment scheduling service?",
    answer:
      "Our appointment scheduling service is free to use. There are no hidden fees associated with booking appointments through our app.",
  },
  {
    id: 4,
    question: "Can I see my past appointment history in the app?",
    answer:
      "Yes, your past appointment history is available in the app. Navigate to the appointment history section to view details of your previous medical appointments.",
  },
];

const FrequentlyAskedQuestions = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="black">
            Everything you need to know
          </Typography>
          <Typography variant="subtitle1" color="neutral.600">
            Frequently asked questions
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {questions.map(({ id, question, answer }) => (
            <Accordion
              key={id}
              sx={{
                backgroundColor: "transparent",
                boxShadow: 'none'
              }}
            >
              <AccordionSummary
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: 'none'
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle1">{question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: 'none'
                }}
              >
                <Typography variant="body2">{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default FrequentlyAskedQuestions;
