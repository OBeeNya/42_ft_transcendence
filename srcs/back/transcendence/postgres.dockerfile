FROM		postgres:latest

RUN			apt -y update \
			&& apt -y install postgresql \
			&& mkdir -p /var/run/postgresql \
			&& chmod 777 /var /var/run /var/run/postgresql

COPY		./bin/postgres_entrypoint.sh /usr/local/bin/postgres_entrypoint.sh

EXPOSE		5432

ENTRYPOINT	["/bin/bash", "/usr/local/bin/postgres_entrypoint.sh"]
