import { useEffect, useState } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Nullable<T> = T | null | undefined;

const usePosts = () => {
  const [posts, setPosts] = useState<Nullable<Post[]>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    const fetchPostsList = async () => {
      try {
        const response = await fetch(POSTS_URL);
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
  }, []);
  return { posts, isLoading, error };
};

export default usePosts;
