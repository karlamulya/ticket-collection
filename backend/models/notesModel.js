const mongoose = require('mongoose');
const noteScheme = mongoose.Schema({
   
    user:{
      type: mongoose.SchemaTypes.ObjectId,
      required:true,
      ref: 'User'
    },
    ticket:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true,
        ref: 'Ticket'
      },
    
    text:{
        type:String,
        required:[true,'please add some text'],
    },

    isStaff:{
        type:Boolean,
        default:false,
    },

    staffID:{
        type:String,
    },
 
},
{
 timestamps: true,
},
)

module.exports = mongoose.model('Note', noteScheme)