import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ChangeEvent, useState } from "react";
import PostsModal from "../../modals/PostsModal";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Nullable<T> = T | null | undefined;
type PostListProps = {
  posts: Nullable<Post[]>;
  page: number;
  setPage: (newPage: number) => void;
  patchUpdatePost: (title: string, id: number) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
};

const PostsTable = ({
  posts,
  page,
  setPage,
  patchUpdatePost,
  deletePost,
}: PostListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const handleClose = () => setOpen(false);

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOnSubmit = async (newPost: Post) => {
    setOpen(false);
    setSelectedPost(null);
    await patchUpdatePost(newPost.title, newPost.id);
  };

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confirmed) {
      await deletePost(postId);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts &&
              Object.entries(posts).map(([key, post]) => (
                <TableRow
                  key={post.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell align="center">{post.title}</TableCell>
                  <TableCell align="center">{post.body}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      direction: "row",
                    }}
                  >
                    <Tooltip title="Click to update">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedPost(post);
                          setOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Click to delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ margin: "20px", display: "flex", justifyContent: "center" }}
        count={10}
        variant="outlined"
        page={page}
        onChange={handleChange}
      />
      <PostsModal
        open={open}
        handleClose={handleClose}
        selectedPost={selectedPost}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default PostsTable;
