import CustomeError from "../errors/custome-error.js";
import { usersService } from "../services/users.service.js"
import { verifyToken } from "../utils.js";

class UsersController {
  findAllUser = async (req, res) => {
    try {
      const result = await usersService.findAll();
      res.status(200).json({ users: result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  findUserById = async (req, res) => {
    const { idUser } = req.params;
    try {
      const result = await usersService.findById(idUser);
      res.status(200).json({ user: result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All data is required" });
      }
      const result = await usersService.createOne(req.body);
      res.status(200).json({ user: result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  changeRole = async (req, res) => {
    try {
      const { uid } = req.params;

      await usersService.changeRole(uid);

      res.status(200).json({ message: "Role changed with success" });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  findByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const result = await usersService.findByEmail(email);

      return res.status(200).json({ message: "User found", result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { idUser } = req.params;
      const result = await usersService.deleteOne(idUser);
      return res.status(200).json({ message: "User delete", result });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  deleteAllInactiveUsers = async (req, res) => {
    try {
      //usuarios inactivos hace 48 horas 
      // const limitDate = new Date(Date.now() - 48 * 60 * 60 * 1000);    

      //test usuarios inactivos hace 1 minuto
      const limitDate = new Date(Date.now() - 1 * 60 * 1000); // 1 minuto en milisegundos


      await usersService.deleteAllInactiveUsers({ last_connection: { $lt: limitDate } });

      return res.status(200).json({ message: "Users not connected in last 48 hours deleted"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      await usersService.forgotPassword(email);
      return res.status(200).json({ message: "The link has been sent to your email" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const { email } = verifyToken(token);

      await usersService.resetUserPassword(email, password);

      return res.status(200).json({ message: "Password change" });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  addDocuments = async (req, res) => {
    try {
      const { uid } = req.params;
      const files = req.files;

      let newDocuments = [];

      console.log("files:", files);

      const fileKeys = Object.keys(files);

      fileKeys.forEach(category => {
        files[category].forEach(file => {
          newDocuments.push({
            name: file.originalname,
            reference: file.path,
            type: category,
            status: {
              uploaded: true
            }
          });
        });
      });

      await usersService.addDocuments(uid, newDocuments);

      return res.status(200).json({ message: "Document added with success" });
    } catch (error) {
      if (error instanceof CustomeError) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}

export const usersController = new UsersController();