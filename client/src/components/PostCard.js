import React from "react";
import { Card, Image, Label, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({ post: { body, id, username, likeCount, commentCount } }) {
  function likePost() {
    console.log("Post like");
  }

  function commentOnPost() {
    console.log("Comment on post");
  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header as={Link} to={`/posts/${id}`}>
          {username}
        </Card.Header>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button color="teal" basic onClick={likePost}>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="blue" basic onClick={commentOnPost}>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
