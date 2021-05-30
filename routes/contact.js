const express= require('express')
const { findOneAndDelete } = require('../Models/Contact')
const Contact = require('../Models/Contact')
const router= express.Router()

// ADDING NEW CONTACT

router.post('/', async (req, res)=> {
    try {
    const {firstName,lastName, email, telephone}= req.body
    
    if (!firstName||!lastName||!email )
    {return res.status(400).send("You must enter a Full name and the Email adress")}

    const contactEmailCheck= await Contact.findOne({email})
    if(contactEmailCheck) {
        return res.status(400).send("The Email adress is used")
    }


    const contact= new Contact({FirstName,LastName,Email, Telephone})
    await contact.save()
    res.status(200).send({msg:"the contact is added", contact})

    } catch (error) {
        res.status(500).send("contact wasn't added")
    }
})

// GET CONTACTS
router.get('/', async(req,res)=>{
    try {
        const contactList= await Contact.find()
        res.status(200).send({msg:"Contact List", contactList}) 
    } catch (error) {
        res.status(500).send("Cant' get the Data")
    }
})

// UPDATE 
router.put('/:Id', async(req, res)=>{
try {
    const {Id}= req.params
    const newData= await Contact.findByIdAndUpdate({_id:Id},{$set:{...req.body}})
    res.status(200).send({msg:"Contact edited successfully",newData})
} catch (error) {
    res.status(500).send("Cant' edit the Data")
}
})

//DELETE

router.delete('/:Id', async(req, res)=>{
    try {
        const {Id}= req.params
        await Contact.findByIdAndDelete(Id)
        res.status(200).send("Contact is deleted successfully")
    } catch (error) {
        res.status(500).send("Cant' delete the contact")
    }
    })


module.exports=router