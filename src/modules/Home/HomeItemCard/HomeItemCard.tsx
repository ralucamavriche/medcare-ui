import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

interface ItemInterface {
  logo: string;
  title: string;
  description: string;
}

interface HomeItemCardProps {
  item: ItemInterface;
}

const HomeItemCard = (props: HomeItemCardProps) => {
  const { item } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={item.logo} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {item.title}
        </Typography>
        <Typography align="center" variant="body1">
          {item.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
    </Card>
  );
};

HomeItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HomeItemCard;
