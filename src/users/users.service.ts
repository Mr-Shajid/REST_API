import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.Doe@example.com",
            "role": "admin"
        },
        {
            "id": 2,
            "name": "John Dane",
            "email": "john.Dane@example.com",
            "role": "intern"
        },
        {
            "id": 3,
            "name": "John Suck",
            "email": "john.Suck@example.com",
            "role": "admin"
        },
        {
            "id": 4,
            "name": "John Heck",
            "email": "john.Heck@example.com",
            "role": "admin"
        }
    ]

    findAll(role?: 'admin' | 'intern') {
        if(role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id)
    }

    create( user: {name: string, email: string, role: 'admin' | 'intern'} ) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser =  {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, userUpdate: {name?: string, email?: string, role?: 'admin' | 'intern'}) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return { ...user, ...userUpdate}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id:number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
