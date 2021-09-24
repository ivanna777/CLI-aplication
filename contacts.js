const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contacts = require("./db/contacts.json")

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try{
        await fs.readFile(contactsPath, "utf-8");
        return contacts
    } catch(error) {
        console.log(error.message)
    }
}

async function getContactById(contactId) {
    try {
        const contactById = contacts.find(item=>
        item.id === contactId);
        if(!contactById) return null;
    return contactById
    }catch(error) {
        console.log(error.message)
    }   
}

async function removeContact(contactId) {
    try{
        const idx = contacts.findIndex(contact => contact.id === contactId);
        if (idx === -1) return null;
        contacts.splice(idx, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts))
        return contactId
    }catch(error) {
        console.log(error.message)
    }   
}

async function addContact(name, email, phone) {
    try {
        const newContact = {id: uuidv4(), name, email, phone};
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    }catch(error) {
        console.log(error.message)
    } 
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}