const {
  signIn,
  register,
  restorePassword,
} = require("../../firebase/firebase.js")



class AuthService {
  constructor(){}
  signIn = async (email, password) =>{
    try {
      const isSignInSuccessful = await signIn(email, password);
      return isSignInSuccessful.user
      if (isSignInSuccessful) {
        // let user;
        // Check if it's a customer
        // user = await this.userService.getByEmail(email);
        // If it's not a customer, check if it's staff
        // if (!user) {
        //   user = await this.staffService.getByEmail(email);
        // }
          // if (user) {
          //   const staff = await this.staffCollection.getByUser(user._id);
          //   const result = user;
          //   result.staff = staff;
          //   return staff
          //   // return createJwt(result);
          // } else {
          //   throw new Error('User not found');
          // }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during signIn:', error);
      throw new Error('Authentication failed');
    }
  }
  register = async (staffMail, password, staffDni, businessId, staffName, image, phone, enable) =>{
    try {
      const existingByEmail = await this.staffService.getByEmail(staffMail);
      const existingByDni = await this.staffService.getByDni(staffDni);

      if (existingByEmail || existingByDni) {
        return { message: "Staff member already exists" };
      }

      await register(staffMail, password);

      const user = {
        staffDni,
        businessId,
        staffName,
        image,
        staffMail,
        sucursales: [],
        phone,
        enable,
        idProfile: [],
      };

      await this.staffService.createStaff(user);

      return { type: "staff", token: createJwt(user) };
    } catch (error) {
      console.error('Error during staff registration:', error);
      return { message: "Failed to register staff member" };
    }
  }

  restorePassword = async (email) => {
    return await restorePassword(email);
  };
}





export { AuthService };

