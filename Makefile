COMMAND	=	docker compose

all		: build up

build :
	$(COMMAND) -f ./docker-compose.yml build

up		:
	$(COMMAND) -f ./docker-compose.yml up -d

stop	:
	$(COMMAND) -f ./docker-compose.yml stop dev-db backend

clean: stop
	docker system prune -a --force

fclean: stop
	docker system prune -a --force --volumes

re : fclean all

.PHONY: all re down clean fclean