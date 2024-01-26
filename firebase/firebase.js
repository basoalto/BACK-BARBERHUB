const { extend } = require('joi');
const authAdmin = require('./config');
const FirebaseConfig = require('./config')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser,  getUserByEmail } = require("firebase/auth");


class FirebaseService extends FirebaseConfig {
  constructor() {
    super()
    this.initializeApp()
    this.auth = getAuth(this.app);
  }
  async signIn(email, password) {
    console.log('auth',this.auth)
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(`${userCredential.user.email} ha iniciado sesión`);
      return true;
    } catch (error) {
      console.log('Intento fallido de inicio de sesion', error);
      return false;
    }
  }

  register = async (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  async restorePassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de restablecimiento de contraseña enviado con éxito');
      return true;
    } catch (error) {
      console.log('Error en restorePassword:', error);
      return false;
    }
  }
  deleteByEmail = async (email) => {
    try {
      // Buscar el usuario por email
      console.log(email)
      const userRecord = this.auth.currentUser
      const userByEmail = await getUserByEmail(email)
      console.log("userByEmail",userByEmail)
      const response =await deleteUser(userRecord);
      console.log(response)
      console.log(`Usuario con email ${response} eliminado con éxito.`);
      return true;
    } catch (error) {
      console.error('Error al intentar eliminar el usuario:', error);
      return false;
    }
  }


}
module.exports = FirebaseService;
