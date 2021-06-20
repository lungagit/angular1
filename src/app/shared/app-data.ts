import { InMemoryDbService } from "angular-in-memory-web-api";
import { Advert } from "../adverts/advert";
import { User } from "../users/user";

export class AppData implements InMemoryDbService{
    createDb(){
        let users: User[] = [
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

        const adverts: Advert[] = [
            {
                id: 1,
                header: 'Sneaker',
                description: 'Nike airforce white sneakers',
                price: 500.00,
                date: '2020-06-18'
            },
            {
                id: 2,
                header: 'TV',
                description: 'Sansui 52-inch(132cm) FHD LED SLED-52FHD',
                price: 750.00,
                date: '2020-06-18'
            },
            {
                id: 3,
                header: 'Hardrive',
                description: 'Western Digital Black D10 Game Drive 12TB Xbox',
                price: 500.00,
                date: '2020-06-18'
            },
            {
                id: 4,
                header: 'Phone',
                description: 'Samsung Galaxy A31 Prism Crush Blue Dual Sim',
                price: 1500.00,
                date: '2020-06-18'
            },
            {
                id: 5,
                header: 'Laptop',
                description: 'Acer Nitro 5 i5 10300H 8GB RAM 1TB HDD GTX1650 15.6" Gaming Laptop',
                price: 2500.00,
                date: '2020-06-18'
            },
            {
                id: 6,
                header: 'Router',
                description: 'Zyxel Wireless AC1200 Router- FE, Simultaneously Connect Up To 64 Devices',
                price: 200.00,
                date: '2020-06-18'
            },
        ];
        return { users, adverts };

        
    }
}