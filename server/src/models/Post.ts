import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  import { User } from "./User";
  
@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    creator: User

    @Column()
    @IsNotEmpty()
    title: string

    @Column()
    @IsNotEmpty()
    description: string

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    public get json() {
        return {
            _id: this.id,
            creator: this.creator,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
        }
    }

}
