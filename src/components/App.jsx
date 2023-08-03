import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import * as MyStyles from './MyStyles';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
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

    this.setState(
      prevState => ({
        contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
      }),
      () => {
        this.addToLocalStorage();
      }
    );
  };
  addToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };
  removeContact = contactId => {
    this.setState(
      prevState => {
        return {
          contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        };
      },
      () => {
        this.addToLocalStorage();
      }
    );
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
