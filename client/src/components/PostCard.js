import React from "react";
import { Card, Image } from "semantic-ui-react";

function PostCard({ post: { body, id, username, linkCount, commentCount } }) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Button Here</p>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
