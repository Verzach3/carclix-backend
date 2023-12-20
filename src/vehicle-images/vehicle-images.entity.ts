import { Vehicle } from 'src/vehicles/vehicles.entity';
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VehicleImage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

}
