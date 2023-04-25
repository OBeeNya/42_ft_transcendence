// le dto sert à décrire les données qu'on attend (qui seront envoyer via POST) != interfaces

export class CreateUserDto {
	readonly id: number;
	readonly userName: string;
	readonly isAdmin: boolean;
	readonly level?: string
}

