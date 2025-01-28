# Proyecto de Gestión de Tareas

Este proyecto es una aplicación web para gestionar tareas, desarrollado con **Angular** en el frontend y **Django** en el backend. Se utiliza **PostgreSQL** como base de datos, y el despliegue está preparado para ejecutarse en **Docker**.

---

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Configuración del Proyecto](#configuración-del-proyecto)
3. [Configuración de Docker](#configuración-de-docker)
4. [Comandos de Python para Migraciones](#comandos-de-python-para-migraciones)
5. [Ejecución del Proyecto](#ejecución-del-proyecto)
6. [Contribuciones](#contribuciones)
7. [Licencia](#licencia)

---

## Requisitos

Asegúrate de tener instalados los siguientes requisitos previos en tu máquina:

- **Docker** y **Docker Compose**
- **Python 3.10+**
- **Node.js 22.11+** y **pnpm**
- **PostgreSQL 17+**
- **Angular 19**

---

## Configuración del Proyecto

### Clona el repositorio

```bash
git clone https://github.com/jofagaca69/weAreDevs-RetoTecnico.git
cd weAreDevs-RetoTecnico
````

---

## Configuración de Docker

El proyecto incluye un archivo Dockerfile para facilitar la configuración de la base de datos PostgreSQL.
Para hacer el respectivo build de la imagen de docker, ejecutar el siguiente comando:
```
docker build -t wad-db .
```
Y para ejecutar el servicio de la base de datos, ejecutar el siguiente comando:
```
docker run -d --name local-wad-db -p 5432:5432 wad-db
```
Con estos pasos se ejecutará el servicio de la base de datos utilizando docker y evitando los conflictos de versiones.


---

## Comandos de Python para Migraciones
```
cd Backend\WADBackend
```

Activar el entorno virtual
```
pyenv\Scripts\activate
```
Ejecutar las migraciones necesarias para la base de datos
```
python manage.py makemigrations
python manage.py migrate
```

Crear el superusuario, teniendo en cuenta que este usuario será el utilizado para ingresar al frontend
```
python manage.py createsuperuser
```

---

## Ejecución del Proyecto
### 1. **Levantar el Backend (Django)**
Asegúrate de estar en el directorio del backend:

```bash
cd Backend/WADBackend
```
Ejecuta el servidor de desarrollo de Django:
```bash
python manage.py runserver
```
Esto levantará la API en http://127.0.0.1:8000/ o http://localhost:8000/.

Si necesitas probar la API, puedes usar una herramienta como Postman.

### 2. **Levantar el Frontend (Angular)**

Asegúrate de estar en el directorio del frontend:

```bash
cd Frontend/WAD-frontend
```

Instala las dependencias con pnpm:
```bash
pnpm install
```

Ejecuta el servidor de desarrollo de Angular:
```
ng serve
```
Esto levantará el frontend en http://localhost:4200/.

Si usas Capacitor para probar en Android, sincroniza los cambios y abre el proyecto en Android Studio:
```
pnpm exec cap sync
pnpm exec cap open android
```

### 3. **Acceder a la Aplicación**
- Frontend Angular: http://localhost:4200/
- API Django: http://localhost:8000/api/
- Base de Datos PostgreSQL: Se ejecuta en el puerto 5432 dentro del contenedor de Docker.
Si creaste un superusuario, usa esas credenciales para ingresar al frontend.

---
## Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

- Haz un fork del proyecto.
- Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad).
- Realiza tus cambios y haz commit (git commit -m 'Agrego nueva funcionalidad').
- Envía un pull request.
---
## Licencia

Este proyecto está licenciado bajo la MIT License.