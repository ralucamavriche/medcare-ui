import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import Posts from "../../modules/Posts";

const PostsPage = () => {
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>

      <Container>
        <Typography sx={{ my: 2 }} variant="h3">
          Posts
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Posts list for Efficient Patient Care
        </Typography>
        <Posts />
      </Container>
    </>
  );
};

export default PostsPage;
