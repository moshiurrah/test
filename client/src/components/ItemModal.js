import React, { Component } from 'react';
import {
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';


function validate(name, description) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (name.length === 0) {
    errors.push("Name can't be empty");
  }
  if (description.length === 0) {
    errors.push("Description can't be empty");
  }
 
  return errors;
}

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    description: '',
    error:[]
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      description: this.state.description
    };

    const errors = validate(name, description);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {

    const { errors } = this.state;
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add an item
          </Button>
        ) : (
          <Media>
          <Media heading>{`Please log in to manage items\n\n`}</Media>
          <img src={logo} alt="Logo" width="100" height="100" />
          <p>{'\n'}</p>
          </Media>
           )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Rent/Sell an Items</ModalHeader>
          <ModalBody>                   
            <Form onSubmit={this.onSubmit}>
              {errors.map(error => (
               <p key={error}>Error: {error}</p>
               ))}
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add an item'
                  onChange={evt => this.setState({ name: evt.target.value })}
                />
                <Label for='description'>Description</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='Add a brief description'
                  onChange={evt => this.setState({ description: evt.target.value })}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem}
)(ItemModal);
