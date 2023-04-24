DOCKER_COMPOSE = sudo docker-compose
DOCKER_COMPOSE_FILE = srcs/docker-compose.yml
VOLUME_PATH = /home
BASH = /bin/bash
FCLEAN_FILE = srcs/clean.sh

all:
	@${DOCKER_COMPOSE} -f ${DOCKER_COMPOSE_FILE} up --build -d

fclean:
	@${BASH} ${FCLEAN_FILE} || true

.PHONY: all
