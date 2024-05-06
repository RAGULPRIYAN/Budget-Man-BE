import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
 
    @Entity()
    export class User {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({nullable:true})
      name: string;
    
      @Column({nullable:true})
      email: string;
    
      @Column({ nullable: true})
      password: string;
  
      @Column({ nullable: true})
      socialId: string;
  
      @Column()
      userLoginType: string;
    
     
    
      @CreateDateColumn()
      createdAt: Date;
    
      @UpdateDateColumn()
      updatedAt: Date;
    
      @DeleteDateColumn()
      deletedAt: Date;
    
      @ManyToOne(() => User, (user) => user.id)
      @JoinColumn({ name: "createdBy" })
      createdBy: User;
    
      @ManyToOne(() => User, (user) => user.id)
      @JoinColumn({ name: "modifiedBy" })
      modifiedBy: User;
    
      @Column({ nullable: true })
      uuidToken: string;
    
      @Column({ default: 0 })
      isVerified: boolean;
    }
    