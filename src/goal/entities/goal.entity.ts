import { User } from "src/user/entities/user.entity";
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
export class goal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goalName: string;

    @Column()
    goalAmount: string;


    @Column()
    savedAmount: string;

    @Column()
    targetDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "createdBy" })
    createdBy: User;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "updatedBy" })
    updatedBy: User;

    @DeleteDateColumn()
    deletedAt: Date;

}
