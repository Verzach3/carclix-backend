import { Contains, IsDate, IsDefined, IsEmail, Matches, MaxLength, Min, MinLength, isDefined } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(2)
    @MaxLength(20)
    @IsDefined()
    first_name: string;

    @Column()
    @MinLength(2)
    @MaxLength(20)
    @IsDefined()
    last_name: string;

    @Column()
    address: string;

    @Column()
    @MinLength(5)
    @MaxLength(10)
    @IsDefined()
    phone: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @Column()
    city: string;

    @Column()
    @IsDate()
    date_of_birth: Date;

    @Column()
    gender: string;

    @Column()
    contact_preference: string;

    @Column()
    cedula: string;

    @Column()
    @IsDefined()
    user_type: "admin" | "seller" | "customer";
}