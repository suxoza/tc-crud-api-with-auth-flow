import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

import { User } from "../models/User";
import { Post } from "../models/Post";

class PostController {

  static async newPost(req: Request, res: Response) {
    try {
      let { title, description } = req.body;
      const post = new Post()
      post.title = title
      post.description = description
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({id: res.locals.jwtPayload.id})
      // @ts-ignore
      post.creator = user 

      //Validade 
      const errors = await validate(post);
      if (errors.length > 0) 
          return res.status(400).send(errors);

      const _post = await AppDataSource.manager.save(post);      
      res.status(200).json(_post.json)
      
    } catch (error) {
      return res.status(400).send(error)
    }
  };


  static async getOne(req: Request, res: Response) {
    try {
      let { postId } = req.params;
      const postRepository = AppDataSource.getRepository(Post);
      const data = await postRepository.findOneBy({id: parseInt(postId)})
      if(!data)
        return res.status(404).send('Not Found!')
      res.status(200).json(data)
      
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  static async listAll(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const data = await postRepository.find({order: { id: "desc" }})
      res.status(200).json(data.map(post => post.json))
      
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  static async editPost(req: Request, res: Response) {
    try {
      let { postId } = req.params;
      let { title, description } = req.body;
      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOneBy({id: parseInt(postId)})
      if(!post)
        return res.status(404).send('Not Found!')

      post.title = title
      post.description = description
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({id: res.locals.jwtPayload.id})
      // @ts-ignore
      post.creator = user 

      // Validade 
      const errors = await validate(post);
      if (errors.length > 0) 
          return res.status(400).send(errors);

      const _post = await postRepository.save(post);
      res.status(200).json(_post.json)
      
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      let { postId } = req.params;
      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOneBy({id: parseInt(postId)})
      if( !post )
        return res.status(404).send('Not Found!')
      const status = await postRepository.delete({id: parseInt(postId)})
      res.status(200).json(status)
      
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
export default PostController;