import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

enum NewsStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity('news')
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ type: 'text' })
    datetime: Date;

}
