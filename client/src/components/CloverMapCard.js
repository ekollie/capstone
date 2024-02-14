import React from "react";
import { Item, Button } from "semantic-ui-react";

function CloverMapCard({ toggleShowPage, clover }) {
  const handleClick = (e) => {
    toggleShowPage(clover);
  };

  return (
    <Item>
      <Item.Image src={clover.image_url} size="tiny" />
      <Item.Content>
        <Item.Header>
          <strong>{clover.location}</strong>
        </Item.Header>
        <Item.Meta></Item.Meta>
        <Button onClick={handleClick}>See Profile</Button>
      </Item.Content>
    </Item>
  );
}

export default CloverMapCard;
