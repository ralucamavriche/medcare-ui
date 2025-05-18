import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
interface PostsDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  postId: null | number;
  onDelete: (postId: number) => void;
}

const PostsDeleteModal = ({
  open,
  handleClose,
  postId,
  onDelete,
}: PostsDeleteModalProps) => {
  if (!postId) return null;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDelete(postId);
          }}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostsDeleteModal;
