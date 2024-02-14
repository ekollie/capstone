import React from "react";
import CloverCard from "./CloverCard";
import { Item, Segment } from "semantic-ui-react";
import uuid from "uuid";
import CloverPage from "./CloverPage";

export default class CloversList extends React.Component {
  state = {
    clicked: false,
    selectedClover: "",
  };

  handleListClick = (dr) => {
    this.setState({
      clicked: true,
      selectedClover: dr,
    });
  };

  handlePageClick = () => {
    this.setState({
      clicked: false,
      selectedClover: "",
    });
  };

  createCloverCards = () => {
    return this.props.clovers.map((clover) => (
      <CloverCard
        dr={clover}
        key={uuid()}
        onClick={this.handleListClick}
        toggleShowPage={this.props.toggleShowPage}
      />
    ));
  };

  render() {
    return (
      <div className="mainItemClovers" style={{ paddingRight: 20 }}>
        {this.state.clicked ? (
          <CloverPage
            dr={this.state.selectedClover}
            onClick={this.handlePageClick}
            key={uuid()}
          />
        ) : (
          <Segment style={{ height: 620, overflow: "scroll" }}>
            {this.createCloverCards().length ? (
              <Item.Group divided>{this.createCloverCards()}</Item.Group>
            ) : (
              <h1 style={{ textAlign: "center", color: "rgb(95, 124, 162)" }}>
                No results found. Try different search terms.
              </h1>
            )}
          </Segment>
        )}
      </div>
    );
  }
}
