import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  import { generateToken } from "../utils/jwt";
  
@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    public get jsonMinimal() {
        return {
            _id: this.id,
            name: this.name
        }
    }

    public get json() {
        return {
            ...this.jsonMinimal,
            email: this.email,
            userToken: generateToken(this.id),
        }
    }

}
