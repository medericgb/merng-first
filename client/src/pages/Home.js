import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

// Components
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    if (data) {
      console.log(data.getPosts);
    }
  }, [data]);

  // console.log(data);

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
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
