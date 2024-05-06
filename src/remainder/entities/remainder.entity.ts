import { budgets } from "src/budget/entities/budget.entity";
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
export class filters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filterData: string;

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
export class remainder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => filters, (f) => f.id)
    @JoinColumn({ name: "filterId" })
    filterId: number;

    @ManyToOne(() => budgets, (b) => b.id)
    @JoinColumn({ name: "budgetId" })
    budgetId: number;


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
