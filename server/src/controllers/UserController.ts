import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

import { User } from "../models/User";

class UserController {

    static async registerUser(req: Request, res: Response) {
        let { name, email, password } = req.body;
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.hashPassword();
        
        try {
            console.log(user)
            const _user = await AppDataSource.manager.save(user);
            res.status(201).json(_user.json)
        } catch (error) {
            res.status(409).send("username already in use");
            return;
        }

    };

    static async loginUser(req: Request, res: Response) {
        let { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        try {
          const user = await userRepository.findOneBy({email: email});
          if(!user || !(await user.comparePasswords(user.password, password))) 
            return res.status(501).send('Invalid email or password')
          res.status(200).json(user?.json)
        } catch (error) {
          res.status(404).send("User not found");
          return;
        }
      };
};

export default UserController;