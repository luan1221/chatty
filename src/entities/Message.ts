import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn 
} from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { User } from "./User";

@Entity('messages')
export class Message {
  
  @PrimaryColumn()
  id: string;

  @Column()
  adminId: string;
  
  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

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