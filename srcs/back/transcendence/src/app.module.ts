import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; //le controleur écoute une requete et renvoie une reponse
import { AppService } from './app.service';		//fournit des fonctionnalités au controleur
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

