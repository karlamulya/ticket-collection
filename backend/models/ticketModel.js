const mongoose = require('mongoose');
const ticketScheme = mongoose.Schema({
   
    user:{
      type: mongoose.SchemaTypes.ObjectId,
      required:true,
      ref: 'User'
    },
    
    product:{
        type:String,
        required:[true,'please select product'],
        enum: ['iphone','macPro', 'iMac', 'ipad']
    },

    description:{
        type:String,
        required:[true,'please explain the isssue'],
    },

    status:{
        type:String,
        required:true,
        enum:['new','open','close'],
        default:'new'
    },
 
},
{
 timestamps: true,
},
)

module.exports = mongoose.model('Ticket', ticketScheme)