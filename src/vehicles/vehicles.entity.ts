import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer_id: number;

    @Column()
    vehicle_maker: string;

    @Column()
    vehicle_model: string;

    @Column()
    vehicle_year: number;

    @Column()
    vehicle_vin: string;

    @Column()
    purchase_price: number;

    @Column()
    details: string;

    @Column()
    condition_details: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at?: Date;
}