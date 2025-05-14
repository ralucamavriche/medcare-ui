import { Box, Button, Modal, TextField } from "@mui/material";
import { Post } from "../../modules/Posts/PostsTable";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PropsPostsModal {
  open: boolean;
  handleClose: () => void;
  selectedPost: null | Post;
  onSubmit: (newPost: Post) => void;
}

const PostsModal = ({
  open,
  handleClose,
  selectedPost,
  onSubmit,
}: PropsPostsModal) => {
  const [title, setTitle] = useState(selectedPost?.title ?? "");

  useEffect(() => {
    setTitle(selectedPost?.title ?? "");
  }, [selectedPost]);

  if (!selectedPost) return null;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="outlined-controlled"
          label="Title"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            onSubmit({ ...selectedPost, title });
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default PostsModal;
