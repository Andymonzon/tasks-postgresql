-- DB USUARIOS

CREATE DATABASE usuariosdb;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- DB TAREAS

CREATE TABLE tareas(
    id SERIAL PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES usuarios(id)
);
