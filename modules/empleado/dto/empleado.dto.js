const Joi =  require('joi')


const id = Joi.string().uuid()
const anamnesisRemota = Joi.string().alphanum().min(3).max(300);
