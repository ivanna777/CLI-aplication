const { Command } = require('commander');
const {listContacts, getContactById, removeContact, addContact} = require("./contacts");

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
  try {
    switch (action) {
    case 'list':
     const contacts = await listContacts();
     console.table(contacts)
      break;

    case 'get':
      const currentId = Number(id)
     const currentContact = await getContactById(currentId);
     console.log(currentContact)
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact)
      break;

    case 'remove':
      const contactToRemove = await removeContact(Number(id));
      if(contactToRemove) console.log(`Contact with id ${contactToRemove} is removed successfully!`)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}catch(error) {
  console.log(error)
}
}
invokeAction(argv);
