const {contactos} = require('../../../models');
const {usuario} = require('../../../models');
const { param } = require('../../routes/auth/auth');

const contacts = async (req, res) => {

        let arrayContactos = [];

        await contactos.findAll({
            where: {
                idUsuario: req.user.id
            }
        })
        .then(contactos => {
            contactos.forEach(contacto => {
                arrayContactos.push(contacto.dataValues);
            });
            
        })
        .catch(error => {
            console.log(error);
        })


    res.render('contacts/contacts', {arrayContactos})
}

const addContacto = (req, res) => {
    res.render('contacts/add');
}

const saveContact = async(req, res) => {

    const {contactName, telephone, description } = req.body;
    
    await contactos.create({ idUsuario: req.user.id, nombre: contactName, telefono: telephone, descripcion: description})
            .then( repuesta => {
                res.redirect('/contacts');
            })
            .catch(error => {
                console.log(error)
            })


}

const deleteContact = async(req, res) => {

    const {id} = req.params;

    await contactos.destroy({
        where: {
            id: id
        }
    })
    .then(res => {
    })
    .catch( error => {
        console.log(error);
    })

    res.redirect('/contacts');
}

const contactEdit = async(req, res) => {
    const {id} = req.params;
    const {contactName, telephone, description } = req.body;

    const contactoUpdate = await contactos.update({nombre: contactName, telefono: telephone, descripcion: description},{
        where: {
            id: id
        }
    })

    console.log(contactoUpdate);

    res.redirect('/contacts');
}

const editContact = async(req, res) => {
    const {id} = req.params;

    const contacto = await contactos.findAll({
        where: {
            id: id
        }
    })

    res.render('contacts/update', {Contacto: contacto[0].dataValues});


}

module.exports = {
    contacts,
    addContacto,
    saveContact,
    deleteContact,
    editContact,
    contactEdit
};