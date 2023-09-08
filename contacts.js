import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import path from 'path';

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  let result = fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .catch(error => console.log(error.message))
  return result
}

async function getContactById(contactId) {
  let result = fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data => data.find(function (item) { return item.id === contactId }))
    .catch(error => console.log(error.message))
  return(await result ? result : null)
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data => data.filter(item => item.id !== contactId))
    .then(data => fs.writeFile(contactsPath, JSON.stringify(data, null, 2), (error) => {
        if (error) {console.log(error.message)}
    }))
    
    .catch(error => console.log(error.message))
    
  let deletedContact = getContactById(contactId);
  return(deletedContact ? deletedContact : null)
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  let contacts = await listContacts();
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
    if (error) {
      console.log(error)
    }
  })
  return newContact
};

export {listContacts, getContactById, removeContact, addContact}