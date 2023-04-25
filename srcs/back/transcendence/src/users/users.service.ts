import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	// First array of users, will be replaced by our PostGre DB
	usersArray: User[] = [
		{
			id: 1,
			userName: "Ben",
			level: "Expert",
			isAdmin: true
		},
		{
			id: 2,
			userName: "Felix",
			level: "Boss",
			isAdmin: true
		},
		{
			id: 3,
			userName: "Vlad",
			level: "975",
			isAdmin: false
		}
	];

	findAll(): User[] {
		return this.usersArray;
	}

	findOne(id: string) {
		return this.usersArray.find(user => user.id === Number(id)); 
	}

	create(newUser: CreateUserDto) {
		this.usersArray = [...this.usersArray, newUser]
	}

	update(id: string, user: User) {
		// retrieve user to update
		const userToUpdate = this.usersArray.find(user => user.id === Number(id));
		if (!userToUpdate) {
			return new NotFoundException("didn't find user");
		}

		// apply modification to granularly update a single property
		if (user.userName) {
			userToUpdate.userName = user.userName;
		}
		if (user.isAdmin) {
			userToUpdate.isAdmin = user.isAdmin;
		}
		if (user.level) {
			userToUpdate.level = user.level;
		}
		// plutot checker l'id au debut?
		const updatedUserArray = this.usersArray.map(user => user.id !== Number(id) ? user : userToUpdate)
	
		this.usersArray = [...updatedUserArray];
		return { updatedUser: 1, user: userToUpdate };
	}

	delete(id: string) {
		const nbOfUsersBeforeDelete = this.usersArray.length;
		this.usersArray = [...this.usersArray.filter(user => user.id !== Number(id))] //revoir filter + spread Op
		if(this.usersArray.length < nbOfUsersBeforeDelete) {
			return { deletedUsers: 1, nbUsers: this.usersArray.length };
		} else {
			return { deletedUsers: 0, nbUsers: this.usersArray.length };
		}
	}
}
