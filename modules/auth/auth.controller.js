const e = require('express');
const AuthService = require('./auth.service')

const service = new AuthService

const signIn = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const response = await service.singIn(correo, contrasena)
    if(response){
      res.status(200).json(response);
    }else{
      res.status(404).send("No existe el usuario")
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const resetPassword= async (req, res)=> {
  try{
    const {correo} = req.body;
    console.log(correo)
    const response = service.resetPassword(correo)
    if(response){
      res.status(200).json({ response: 'email enviado para restablacer clave' });
    }else{
      res.status(404).send('No se encontro el email')
    }
  } catch (error) {
    console.error('Error registering user:', error );
    res.status(404).json('Bad Request');
  }
}


module.exports = {signIn, resetPassword}
