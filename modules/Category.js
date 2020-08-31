const mongoose = require('mongoose');
const CatrgorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    parent_id: {
        type: String,
    },
    provider_id: {
        type: String,
    },
});
module.exports = mongoose.model('Catrgory', CatrgorySchema);