import { EntityEntity } from "src/module/entity/entities/entity.entity";
import { User } from "src/module/user/entities/user.entity";

export interface UserEntityInterface{
    id: number;
    user: User;
    entity: EntityEntity;
}