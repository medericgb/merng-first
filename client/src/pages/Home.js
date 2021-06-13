import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

// Components
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState();

  // useEffect for get data during component mounting
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
      console.log(posts);
    }
  }, [data]);

  // console.log(data);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 18 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`;

export default Home;
