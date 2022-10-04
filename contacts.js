const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(`${__dirname}/db`, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => parseInt(id) === contactId);
    return result || null;
  } catch (error) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => parseInt(id) === contactId);

    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone,
    };

    await updateContacts([...contacts, newContact]);
    return newContact;
  } catch (error) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
