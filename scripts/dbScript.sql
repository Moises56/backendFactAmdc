-- crear base de datos en mysql llamada factamdcdb
CREATE DATABASE IF NOT EXISTS factamdcdb;

-- seleccionar la base de datos
USE factamdcdb;
-- crear tabla de roles de usuario, con un id y un nombre de rol, los roles deben para gestionar los mercados, parqueos, sanitarios y el administrador del sistema
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL
);

-- insertar roles
INSERT INTO roles (nombre) VALUES ('admin');

INSERT INTO roles (nombre) VALUES ('mercado');

INSERT INTO roles (nombre) VALUES ('parqueo');

INSERT INTO roles (nombre) VALUES ('sanitario');

-- crear tabla de usuarios, con un id, nombre, apellido, correo, contraseña y rol de usuario (relacionado con la tabla roles)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, dni VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, contrasena VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, numero_empleado VARCHAR(255) NOT NULL, rol_id INT NOT NULL, FOREIGN KEY (rol_id) REFERENCES roles (id)
);

-- insertar unos 5 usuarios de prueba, con roles de admin, mercado, parqueo y sanitario, usar  mou grind, Jhon Smith, Xiam Lee, Maria Perez, Esteban Martinez, con correo que tiene que ser el npmnre y el apellido @amdc.hn y contraseñas inventadas y DNI  de 13 digitos aleatorios
INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Estefany', 'Lagos', '0801199502281', 'estefany.lagos@amdc.hn', '123456', '97485132', '011050' 1
    );

INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Mou', 'Grind', '0801199502282', 'mougrind@amdc.hn', '123456', '99485134', '011051' 1
    );

INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Jhon', 'Smith', '0801199502283', 'jhonsmith@amdc.hn', '123456', '97485135', '011052', 2
    );

INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Xiam', 'Lee', '0801199502284', 'xiamlee@amdc.hn', '123456', '97485120', '011053', 3
    );

INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Maria', 'Perez', '0801199502285', 'mariaperez@amdc.hn', '123456', '33485132', '011054', 4
    );

INSERT INTO
    usuarios (
        nombre, apellido, dni, correo, contrasena, telefono, numero_empleado rol_id
    )
VALUES (
        'Esteban', 'Martinez', '0801199502286', 'estebanmartinez@amdc.hn', '123456', '32485132', '011055', 2
    );

-- crear tabla de mercados, con un id, nombre del mercado, direccion, latitud y longitud de ubicacion, Fecha de creacion automatica, Fecha de modificacion automatica
CREATE TABLE IF NOT EXISTS mercados (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre_mercado VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, latitud DECIMAL(10, 8) NOT NULL, longitud DECIMAL(11, 8) NOT NULL, fecha_creacion DATE NOT NULL, fecha_modificacion DATE NOT NULL
);

-- SELECT * FROM factamdcdb.mercados;

-- ver los mercados y mostrar la fecha y hora de creacion
SELECT nombre_mercado, fecha_creacion FROM mercados;

-- insertar unos 5 mercados de prueba, con nombre del mercado, direccion, latitud y longitud de ubicacion, Fecha de creacion automatica, Fecha de modificacion automatica
INSERT INTO
    mercados (
        nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion
    )
VALUES (
        'Mercado Kennedy', 'Col. Kennedy', 14.094, -87.206, '2021-10-01', '2021-10-01'
    );

INSERT INTO

mercados (
    nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion
)
VALUES (
        'Mercado La Isla', 'Col. La Isla', 14.094, -87.206, '2021-10-01', '2021-10-01'
    );

INSERT INTO

mercados (
    nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion
)
VALUES (
        'Mercado La Granja', 'Col. La Granja', 14.094, -87.206, '2021-10-01', '2021-10-01'
    );

INSERT INTO

mercados (
    nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion
)

VALUES (
        'Mercado La Kennedy', 'Col. La Kennedy', 14.094, -87.206, '2021-10-01', '2021-10-01'
    );

INSERT INTO

mercados (
    nombre_mercado, direccion, latitud, longitud, fecha_creacion, fecha_modificacion
)

VALUES (
        'Mercado La Hacienda', 'Col. La Hacienda', 14.094, -87.206, '2021-10-01', '2021-10-01'
    );

-- la tabla de localidades, con: id, propietario, DNI, numero de local, nombre de local, tipo de local, estado de local, latitud y longitud de ubicacion, telefono, direccion, monto, fecha creacion, fecha_modificacion, de a REFERENCES con la tabla de mercados
CREATE TABLE IF NOT EXISTS localidades (
    id INT AUTO_INCREMENT PRIMARY KEY, propietario VARCHAR(255) NOT NULL, DNI VARCHAR(255) NOT NULL, numero_local INT NOT NULL, nombre_local VARCHAR(255) NOT NULL, tipo_local VARCHAR(255) NOT NULL, estado_local VARCHAR(255) NOT NULL, latitud DECIMAL(10, 8) NOT NULL, longitud DECIMAL(11, 8) NOT NULL, telefono VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, monto DECIMAL(10, 2) NOT NULL, fecha_creacion DATE NOT NULL, fecha_modificacion DATE NOT NULL, mercado_id INT NOT NULL, FOREIGN KEY (mercado_id) REFERENCES mercados (id)
);

-- insertar unas 5 localidades de prueba, con propietario, DNI, numero de local, nombre de local, tipo de local, estado de local, latitud y longitud de ubicacion, telefono, direccion, monto, fecha creacion, fecha_modificacion, de a REFERENCES con la tabla de mercados
INSERT INTO
    localidades (
        propietario, DNI, numero_local, nombre_local, tipo_local, estado_local, latitud, longitud, telefono, direccion, monto, fecha_creacion, fecha_modificacion, mercado_id
    )

VALUES (
        'Estefany Lagos', '0801199502281', 1, 'Local Kennedy', 'Comida', 'Disponible', 14.094, -87.206, '97485132', 'Col. Kennedy', 1000, '2021-10-01', '2021-10-01', 1
    );

INSERT INTO

-- crear tabla de parqueos, con un id, nombre del parqueo, direccion, latitud y longitud de ubicacion, el pago por hora, capacidad de vehiculos, horario de atencion
CREATE TABLE IF NOT EXISTS parqueos (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre_parqueo VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, latitud DECIMAL(10, 8) NOT NULL, longitud DECIMAL(11, 8) NOT NULL, pago_hora DECIMAL(10, 2) NOT NULL, capacidad INT NOT NULL, horario_atencion VARCHAR(255) NOT NULL
);

-- insertar unos 5 parqueos de prueba, con nombre del parqueo, direccion, latitud y longitud de ubicacion, el pago por hora, capacidad de vehiculos, horario de atencion
INSERT INTO
    parqueos (
        nombre_parqueo, direccion, latitud, longitud, pago_hora, capacidad, horario_atencion
    )
VALUES (
        'Parqueo Kennedy', 'Col. Kennedy', 14.094, -87.206, 10, 100, '8:00 am - 6:00 pm'
    );

INSERT INTO
    parqueos (
        nombre_parqueo, direccion, latitud, longitud, pago_hora, capacidad, horario_atencion
    )
VALUES (
        'Parqueo La Isla', 'Col. La Isla', 14.094, -87.206, 10, 100, '8:00 am - 6:00 pm'
    );

INSERT INTO
    parqueos (
        nombre_parqueo, direccion, latitud, longitud, pago_hora, capacidad, horario_atencion
    )
VALUES (
        'Parqueo La Granja', 'Col. La Granja', 14.094, -87.206, 10, 100, '8:00 am - 6:00 pm'
    );

INSERT INTO
    parqueos (
        nombre_parqueo, direccion, latitud, longitud, pago_hora, capacidad, horario_atencion
    )
VALUES (
        'Parqueo La Kennedy', 'Col. La Kennedy', 14.094, -87.206, 10, 100, '8:00 am - 6:00 pm'
    );

INSERT INTO
    parqueos (
        nombre_parqueo, direccion, latitud, longitud, pago_hora, capacidad, horario_atencion
    )
VALUES (
        'Parqueo La Hacienda', 'Col. La Hacienda', 14.094, -87.206, 10, 100, '8:00 am - 6:00 pm'
    );

-- crear tabla de tipo de uso de sanitarios, con un id y nombre de tipo de uso, precio por tipo

CREATE TABLE IF NOT EXISTS tipo_uso_sanitarios (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre_tipo_uso VARCHAR(255) NOT NULL, precio DECIMAL(10, 2) NOT NULL
);

-- insertar tipos de uso de sanitarios, que pueden ser sobre el uso como: tipo 1, tipo 2, tipo 1 es con papel, tipo 2 es sin papel
INSERT INTO
    tipo_uso_sanitarios (nombre_tipo_uso, precio)
VALUES ('Tipo 1', 5);

INSERT INTO
    tipo_uso_sanitarios (nombre_tipo_uso, precio)
VALUES ('Tipo 2', 3);

-- crear tabla de sanitarios, con un id, nombre del sanitario, direccion, latitud y longitud de ubicacion, capacidad de personas, horario de atencion, tipo de uso de sanitario (relacionado con la tabla tipo_uso_sanitarios)
CREATE TABLE IF NOT EXISTS sanitarios (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre_sanitario VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, latitud DECIMAL(10, 8) NOT NULL, longitud DECIMAL(11, 8) NOT NULL, capacidad INT NOT NULL, horario_atencion VARCHAR(255) NOT NULL, tipo_uso_sanitario_id INT NOT NULL, FOREIGN KEY (tipo_uso_sanitario_id) REFERENCES tipo_uso_sanitarios (id)
);

-- insertar unos 5 sanitarios de prueba, con nombre del sanitario, direccion, latitud y longitud de ubicacion, capacidad de personas, horario de atencion, tipo de uso de sanitario

INSERT INTO
    sanitarios (
        nombre_sanitario, direccion, latitud, longitud, capacidad, horario_atencion, tipo_uso_sanitario_id
    )
VALUES (
        'Sanitario Kennedy', 'Col. Kennedy', 14.094, -87.206, 10, '8:00 am - 6:00 pm', 1
    );

INSERT INTO
    sanitarios (
        nombre_sanitario, direccion, latitud, longitud, capacidad, horario_atencion, tipo_uso_sanitario_id
    )
VALUES (
        'Sanitario La Isla', 'Col. La Isla', 14.094, -87.206, 10, '8:00 am - 6:00 pm', 2
    );

INSERT INTO
    sanitarios (
        nombre_sanitario, direccion, latitud, longitud, capacidad, horario_atencion, tipo_uso_sanitario_id
    )
VALUES (
        'Sanitario La Granja', 'Col. La Granja', 14.094, -87.206, 10, '8:00 am - 6:00 pm', 1
    );

INSERT INTO
    sanitarios (
        nombre_sanitario, direccion, latitud, longitud, capacidad, horario_atencion, tipo_uso_sanitario_id
    )
VALUES (
        'Sanitario La Kennedy', 'Col. La Kennedy', 14.094, -87.206, 10, '8:00 am - 6:00 pm', 2
    );

INSERT INTO
    sanitarios (
        nombre_sanitario, direccion, latitud, longitud, capacidad, horario_atencion, tipo_uso_sanitario_id
    )
VALUES (
        'Sanitario La Hacienda', 'Col. La Hacienda', 14.094, -87.206, 10, '8:00 am - 6:00 pm', 1
    );

-- se nececita generar una factura de los servicios de los locales, parqueos y sanitarios, con un id, fecha de emision, fecha de vencimiento, total a pagar, estado de la factura, usuario que emite la factura, local, parqueo o sanitario que se factura (relacionado con las tablas localidades, parqueos y sanitarios)
CREATE TABLE IF NOT EXISTS facturas (
    id INT AUTO_INCREMENT PRIMARY KEY, fecha_emision DATE NOT NULL, fecha_vencimiento DATE NOT NULL, total_pagar DECIMAL(10, 2) NOT NULL, estado_factura VARCHAR(255) NOT NULL, usuario_emite_factura_id INT NOT NULL, localidad_id INT, parqueo_id INT, sanitario_id INT, FOREIGN KEY (usuario_emite_factura_id) REFERENCES usuarios (id), FOREIGN KEY (localidad_id) REFERENCES localidades (id), FOREIGN KEY (parqueo_id) REFERENCES parqueos (id), FOREIGN KEY (sanitario_id) REFERENCES sanitarios (id)
);

-- insertar unas 5 facturas de prueba, con fecha de emision, fecha de vencimiento, total a pagar, estado de la factura, usuario que emite la factura, local, parqueo o sanitario que se factura
INSERT INTO
    facturas (
        fecha_emision, fecha_vencimiento, total_pagar, estado_factura, usuario_emite_factura_id, localidad_id
    )
VALUES (
        '2021-10-01', '2021-10-30', 1000, 'Pendiente', 1, 1
    );

INSERT INTO
    facturas (
        fecha_emision, fecha_vencimiento, total_pagar, estado_factura, usuario_emite_factura_id, localidad_id
    )
VALUES (
        '2021-10-01', '2021-10-30', 2000, 'Pendiente', 1, 2
    );

INSERT INTO
    facturas (
        fecha_emision, fecha_vencimiento, total_pagar, estado_factura, usuario_emite_factura_id, localidad_id
    )
VALUES (
        '2021-10-01', '2021-10-30', 3000, 'Pendiente', 1, 3
    );

INSERT INTO
    facturas (
        fecha_emision, fecha_vencimiento, total_pagar, estado_factura, usuario_emite_factura_id, localidad_id
    )
VALUES (
        '2021-10-01', '2021-10-30', 4000, 'Pendiente', 1, 4
    );

INSERT INTO
    facturas (
        fecha_emision, fecha_vencimiento, total_pagar, estado_factura, usuario_emite_factura_id, localidad_id
    )
VALUES (
        '2021-10-01', '2021-10-30', 5000, 'Pendiente', 1, 5
    );

-- mostrar todo los  mercados con cada local
SELECT M.nombre_mercado, L.propietario, L.DNI, L.nombre_local, L.tipo_local, L.estado_local, L.telefono, L.direccion
FROM mercados M
    JOIN localidades L ON M.id = L.mercado_id
ORDER BY M.nombre_mercado;

-- mostrar el usuario y su rol
SELECT U.nombre, U.apellido, U.correo, R.nombre as rol
FROM usuarios U
    JOIN roles R ON U.rol_id = R.id
ORDER BY U.nombre;