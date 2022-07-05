const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');


//@desc get user ticket
//@route GET /api/tickets
//@access private
const getTickets = asyncHandler(async (req, res) =>{

    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    const tickets = await Ticket.find({user:req.user.id})
     res.status(200).json(tickets)
  })

  //@desc get single ticket
//@route GET /api/ticket/:id
//@access private

const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (!ticket) {
      res.status(404)
      throw new Error('Ticket not found')
    }
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  
    res.status(200).json(ticket)
  })

//@desc Delete single ticket
//@route DELETE /api/ticket/:id
//@access private

const deleteTicket = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }
      if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
      }

      await ticket.remove()
  
    res.status(200).json({success:true})
})


//@desc Update single ticket
//@route PUT /api/ticket/:id
//@access private

const updateTicket = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }
      if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
      }

     const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
  
    res.status(200).json(updatedTicket)
})


//@desc create new ticket
//@route  POST /api/tickets
//@access private
const createTicket = asyncHandler(async (req, res) =>{
    const {product, description} = req.body
    if(!product || !description){
          res.status(400)
          throw new Error("please add a product and description")
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user:req.user.id,
        status:'new'
    })
    res.status(200).json(ticket)
   })

module.exports ={
    getTickets, 
    createTicket, 
    getTicket,
    deleteTicket,
    updateTicket
}