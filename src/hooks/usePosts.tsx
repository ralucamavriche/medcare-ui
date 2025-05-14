import { useEffect, useState } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PropsPosts {
  limit?: number;
}

type Nullable<T> = T | null | undefined;
const LIMIT_DEFAULT = 10;

const usePosts = ({ limit = LIMIT_DEFAULT }: PropsPosts) => {
  const [posts, setPosts] = useState<Nullable<Post[]>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Nullable<string>>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPostsList = async () => {
      try {
        const response = await fetch(
          `${POSTS_URL}?_page=${page}&_limit=${limit}`,
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        if (response.status !== 200) {
          throw new Error(`Failed to fetch with status: ${response.status}`);
        }
        const postsResult = await response.json();
        setPosts(postsResult);
      } catch (error) {
        setPosts([]);
        setError((error as Error)?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostsList();
  }, [page, limit]);

  const patchUpdatePost = async (title: string, id: number): Promise<void> => {
    try {
      const response = await fetch(`${POSTS_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (response.status !== 200) {
        throw new Error(
          `Failed to update the post with status: ${response.status}`,
        );
      }

      await response.json();
    } catch (error) {
      console.error("Error in patch!");
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${POSTS_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      if (response.status !== 200) {
        throw new Error(
          `Failed to delete the post with status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error in delete!");
    }
  };

  return {
    posts,
    isLoading,
    error,
    page,
    setPage,
    patchUpdatePost,
    deletePost,
  };
};

export default usePosts;
