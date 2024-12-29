import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

enum NewsStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    email:string
    @Column()
    name:string
    @Column()
    password:string
    @Column()
    accountId:string

}
