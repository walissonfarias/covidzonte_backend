const  express = require('express');


module.exports = {
    async projectController(request ,response ){

     response.send({ok: true, user: request.userId});
    
    }
};
