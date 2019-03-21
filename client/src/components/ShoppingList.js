import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    //document.title="RentAll";
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
 
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name, description }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem className="justify-content-between">
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  <ListGroupItemHeading>  
                  {name}
                  </ListGroupItemHeading>
                  
                  <ListGroupItemText>
                  <h6 >Description</h6>
                  {description}
                  </ListGroupItemText>
                
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
         
        </ListGroup>
       </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
