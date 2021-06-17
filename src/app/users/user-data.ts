import { InMemoryDbService } from "angular-in-memory-web-api";
import { User } from "./user";

export class UserData implements InMemoryDbService{

    createDb(){
        const users: User[] = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Smith',
                email: 'jsmith@gmail.com',
                password: 'john1234'
            },
            {
                id: 2,
                firstName: 'Lisa',
                lastName: 'Davis',
                email: 'ldavis@gmail.com',
                password: 'lisa1234'
            },
            {
                id: 3,
                firstName: 'Olive',
                lastName: 'Lewis',
                email: 'olewis@gmail.com',
                password: 'olive1234'
            },
            {
                id: 4,
                firstName: 'Bill',
                lastName: 'Williams',
                email: 'bwilliams@gmail.com',
                password: 'bill1234'
            },
            {
                id: 5,
                firstName: 'Sandra',
                lastName: 'Lopez',
                email: 'slopez@gmail.com',
                password: 'sandra1234'
            },

        ];
        return { users };
    }
}