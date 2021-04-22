import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn, 
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { User } from "./User";

@Entity('connections')
export class Connection {
  
  @PrimaryColumn()
  id: string;

  @Column()
  adminId: string;
  
  @Column()
  socketId: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)  
  user: User;

  @Column()
  userId: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}