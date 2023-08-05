import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import * as MyStyles from './MyStyles';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.addToLocalStorage();
    }
  }

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  addToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <>
        <MyStyles.Container>
          <MyStyles.Header>PhoneBook</MyStyles.Header>
          <Form onSubmit={this.addContact}></Form>
          <MyStyles.Header>Contacts</MyStyles.Header>
          {this.state.contacts.length > 0 ? (
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          ) : (
            <MyStyles.Wrapper>
              Your phonebook is empty. Add first contact!
            </MyStyles.Wrapper>
          )}
          {this.state.contacts.length > 0 && (
            <ContactList
              contacts={visibleContacts}
              onRemoveContact={this.removeContact}
            />
          )}
        </MyStyles.Container>
      </>
    );
  }
}

export default App;
