import { Alert, CircularProgress, Container } from "@mui/material";
import usePosts from "../../hooks/usePosts";
import PostsTable from "./PostsTable";

const Posts = () => {
  const {
    posts,
    isLoading,
    error,
    page,
    setPage,
    patchUpdatePost,
    deletePost,
  } = usePosts({
    limit: 5,
  });
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container sx={{ marginTop: "10px" }} disableGutters>
      <PostsTable
        posts={posts}
        page={page}
        setPage={setPage}
        patchUpdatePost={patchUpdatePost}
        deletePost={deletePost}
      />
    </Container>
  );
};

export default Posts;
