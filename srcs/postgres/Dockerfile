FROM		postgres:latest

COPY		create_db.sql /docker-entrypoint-initdb.d/

EXPOSE		5432

CMD			["postgres"]
