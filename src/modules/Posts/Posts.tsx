import { Alert, CircularProgress, Container } from "@mui/material";
import usePosts from "../../hooks/usePosts";
import PostsTable from "./PostsTable";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container sx={{ marginTop: "10px" }} disableGutters>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <PostsTable
        posts={filteredPosts}
        page={page}
        setPage={setPage}
        patchUpdatePost={patchUpdatePost}
        deletePost={deletePost}
      />
    </Container>
  );
};

export default Posts;
