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
export class setBudgetAmount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    budget: string;

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


@Entity()
export class expenses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    expense: string;

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



@Entity()
export class budgets {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => setBudgetAmount, (sb) => sb.id)
    @JoinColumn({ name: "setAmountId" })
    setAmountId: number;


    @ManyToOne(() => expenses, (e) => e.id)
    @JoinColumn({ name: "expenseNameId" })
    expenseNameId: number;

    @Column()
    expenseAmount: string;

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