-- Connect to postgresql:	
-- 	sudo -iu postgres
-- 	psql
	
-- List databases:	
-- 	\l
	
-- Connect to database:	
-- 	\c + db_name

-- Get database socket and port:
-- 	\conninfo

-- Help:
-- 	help

-- Long list of commands:
-- 	\?

-- Create a database:
	CREATE DATABASE db_name;

-- Create superuser:
	CREATE USER user_name SUPERUSER;

-- Connect to database from terminal:
-- 	psql -d db_name

-- List users:
-- 	\du

-- If can't connect with just psql because "database user_name does not exist", in terminal:
-- 	createdb

-- Delete database:
	DROP DATABASe db_name;	

-- List of relations:
-- 	\d

-- Create table:
	CREATE TABLE table_name (
		-- Column_name + data_type + any_constraints
		name VARCHAR(20)
	);

-- Data types:
-- 	https://www.postgresql.org/docs/current/datatype.html
-- 	BIGSERIAL: useful for uuid that increments by itself

-- Describe table:
-- 	\d table_name

-- Drop table:
	DROP TABLE table_name;

-- Possible constaints:
	PRIMARY KEY
	NOT NULL

-- Add column to table:
	ALTER TABLE table_name
		ADD Column_name + data_type + any_constraints;

-- Remove column:
	ALTER TABLE table_name
		DROP Column_name;

-- Insert record into tables:
	INSERT INTO table_name (
		Column_name1,
		Column_name2
	)
		VALUES (
			value1,
			value2
		);

-- See content of table:
	SELECT *
		FROM table_name;

-- Execute commands from file:
-- 	\i filename

-- Sort data:
	SELECT * FROM table_name
		ORDER BY Column_name1 ASC, Column_name2 DESC;

-- See unique values:
	SELECT DISTNCT Column_name
		FROM table_name;

-- Filter based on multiple conditions:
	SELECT *
		FROM table_name
			WHERE column_name1="..."
				AND (column_name2="..." OR column_name2="...");

-- Comparison:
	SELECT x = y;
	SELECT x <> y; -- not equal to
	SELECT x <= y;

-- Limit results:
	SELECT *
		FROM table_name
			LIMIT limit_int;
-- Starting from a certain row:
	SELECT *
		FROM table_name
			OFFSET offset_int
			LIMIT limit_int;
	SELECT *
		FROM table_name
			OFFSET offset_int
			FETCH FIRST 5 ROW ONLY; -- sql native

-- Look into an array of values:
	SELECT *
		FROM table_name
			WHERE column_name1
				IN (value1, value2);

-- Select data in a range:
	SELECT *
		FROM table_name
			WHERE column_name1
				BETWEEN value1
					AND value2;

-- Select data using a pattern:
	SELECT *
		FROM table_name
			WHERE column_name1
				LIKE pattern;
	-- example:
	-- 	'%@gmail.___'
-- To ignore case sensitivity:
	SELECT *
		FROM table_name
			WHERE column_name1
				ILIKE pattern;

-- Group data by columns:
	SELECT column_name1, FUNCTION(arg)
		FROM table_name
			GROUP BY column_name2;

-- Extra filtering after group by aggregation:
	SELECT column_name1, FUNCTION(arg)
		FROM table_name
			GROUP BY column_name2;
				HAVING FUNCTION(arg) > 3;
-- Aggregate functions:
-- 	https://www.postgresql.org/docs/current/functions-aggregate.html

-- Arithmetic operations:
-- 	+, -, *, /, ^, !, %

-- Arithmetic operation on column based on an other:
	SELECT *, column_name1*coeff AS new_col_name
		FROM table_name;

-- Setting a default value:
	SELECT COALESCE(column_name1, default1)
		FROM table_name;
	
-- How to dodge division by zero:
	SELECT int1 / NULLIF(int2, 0); -- NULLIF returns int2 if int2 <> 0, else returns NULL

-- Using dates:
	SELECT NOW();
	SELECT NOW()::DATE;
	SELECT NOW()::TIME;

-- Date operations:
	SELECT NOW() - INTERVAL 'x YEAR y MONTH';

-- Extract field from timestamp:
	SELECT EXTRACT(YEAR FROM NOW());

-- Calculate age:
	SELECT AGE(NOW(), 'YYYY-MM-DD');

-- Dropping constraint from variable:
	ALTER TABLE table_name
		DROP CONSTRAINT column_name1;

-- Adding primary key:
	ALTER TABLE table_name
		ADD PRIMARY KEY (column_name1, column_name2, ...);
	
-- Add unique constraint on column:
	ALTER TABLE table_name
		ADD CONSTRAINT constraint_name
			UNIQUE(column_name1, column_name2, ...);
	
-- Constraint based on condition:
	ALTER TABLE table_name
		ADD CONSTRAINT constraint_name
			CHECK (column_name1 == value1 OR column_name1 == value2);
	
-- Delete records:
	DELETE FROM table_name
		WHERE ...;

-- Update records:
	UPDATE table_name
		SET column_name1=value1, column_name2=value2
			WHERE column_name3=value3;

-- Don't do an operation if it provokes a conflict:
	...
		ON CONFLICT (column_name1)
			DO NOTHING;
-- Or do something else:
	...
		ON CONFLICT (column_name1)
			DO UPDATE
				SET column_name1=EXCLUDED.column_name1;

-- Foreign key:
	column type1 REFERENCES foreign_table_name(pk_name)

-- Updating foreign key columns:
	UPDATE table_name
		SET reference_column=value1
			WHERE column2=value2;

-- Inner joins:
	SELECT table1.col1, table2.col2, ... FROM table1
		JOIN table2
			ON table1.column1 = table2.column2;
			-- or if columns have the same name:
			USING (column1);

-- Expanded display:
-- 	\x

-- Left joins:
	SELECT * FROM table1
		LEFT JOIN table2
			ON table1.column = table2.column;

-- Deleting records with foreign keys:
	UPDATE table_name
		SET reference_column=NULL
			WHERE reference_column=value1;

-- Exporting query results to CSV
	-- \copy (SELECT * FROM table1) TO path1 DELIMITER ',' CSV HEADER;

-- Serial and sequences:
-- restart sequence:
	ALTER SEQUENCE sequence1
		RESTART WITH value1;

-- Extensions
-- List extensions:
	SELECT *
		FROM pg_available_extensions;

-- Understanding UUID data type
-- Install extension:
	CREATE EXTENSION
		IF NOT EXISTS
		extension1;
-- List available functions:
	-- \df 
-- Generate uuid:
	SELECT uuid_generate_v4();

-- UUID as primary keys
	CREATE TABLE table1 (
		uuid_var UUID NOT NULL PRIMARY KEY,
		...
	);
	INSERT INTO table1 (uuid_var, ...)
		VALUES (uuid_generate_v4(), ...);
