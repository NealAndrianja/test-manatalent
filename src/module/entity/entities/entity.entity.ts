import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EntityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ length: 20, nullable: true })
    siret: string;

    @Column({ length: 250, nullable: true })
    keyLicence: string;

    @Column({ length: 100, nullable: true })
    website: string;

    @Column()
    createdAt: Date;

    
}