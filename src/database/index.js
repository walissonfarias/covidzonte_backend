const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geolarica:7za8JCGE3obMpgbC@geolaricadatabase-mcmt4.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

module.exports = mongoose;