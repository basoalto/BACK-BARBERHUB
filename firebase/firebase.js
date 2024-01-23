const { extend } = require('joi');
const authAdmin = require('./config');
const FirebaseConfig = require('./config')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser } = require("firebase/auth");


class FirebaseService extends FirebaseConfig {
  constructor() {
    super()
    this.initializeApp()
    this.auth = getAuth(this.app);
  }
  signIn(email, password) {
    console.log('auth',this.auth)
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log(`${userCredential.user.email} ha iniciado sesión`)
        return true
      })
      .catch((error) => {
        console.log('Intento fallido de inicio de sesion', error)
        return false
      });
  }
  getUserByEmail = async () => {
    try {

      const userRecord = this.auth.currentUser
      return userRecord;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

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
      const user = await getUserByEmail(email);
      await this.auth.deleteUser(user.uid);

      console.log(`Usuario con email ${email} eliminado con éxito.`);
      return true;
    } catch (error) {
      console.error('Error al intentar eliminar el usuario:', error);
      return false;
    }
  }


}
module.exports = FirebaseService;
