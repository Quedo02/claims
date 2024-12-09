USE lobosimuladores;

DESCRIBE compras;
DESCRIBE simuladores;
DESCRIBE usuarios;
DESCRIBE tokens;


SELECT * FROM compras;
SELECT * FROM simuladores;
SELECT * FROM usuarios;
SELECT * FROM tokens;

cd htdocs\claims\claims.back\public
php -S localhost:3500
mysql -u root -p
