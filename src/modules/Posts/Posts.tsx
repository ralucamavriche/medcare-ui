import { Alert, CircularProgress, Container } from "@mui/material";
import usePosts from "../../hooks/usePosts";

const Posts = () => {
  const { posts, isLoading, error } = usePosts();
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container sx={{ marginTop: "10px" }} disableGutters>
      Posts Module
      {JSON.stringify(posts)}
    </Container>
  );
};

export default Posts;
