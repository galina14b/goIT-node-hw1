import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

import { Command } from 'commander';
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      let contacts = await listContacts();
      console.table(contacts)
      break;

    case 'get':
      let foundedContact = await getContactById(id)
      console.log(foundedContact)
      break;

    case 'add':
      let newContact = await addContact(name, email, phone)
      console.log(newContact)
      break;

    case 'remove':
      let deletedContact = await removeContact(id)
      console.log(deletedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);



