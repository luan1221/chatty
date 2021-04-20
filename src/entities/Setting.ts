import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryColumn 
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';
 
@Entity('settings')
export class Setting {
  
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;
  
  @Column()
  chat: boolean;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }    
  }

}