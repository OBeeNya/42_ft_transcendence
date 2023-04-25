// le dto sert à décrire les données qu'on attend (qui seront envoyer via POST) != interfaces

export class CreateTodoDto {
	readonly id: number;
	readonly title: string;
	readonly done: boolean;
	readonly description?: string
}

