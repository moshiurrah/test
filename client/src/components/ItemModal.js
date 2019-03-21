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

//form field validate function
function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0
  };
 }

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    description: ''
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
    const errors = validate(this.state.name, this.state.password);
    const newItem = {
      name: this.state.name,
      description: this.state.description
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    //const errors = validate(this.state.name, this.state.description);
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
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  className={errors.name ? "error" : ""}
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add an item'
                  onChange={this.onChange}
                />
                <Label for='description'>Description</Label>
                <Input
                  className={errors.description ? "error" : ""}
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='Add a brief description'
                  onChange={this.onChange}
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
