### STATIC-DEV-SERVER
Simple static file server for dev with file watch

#### node
just run ``npm start`` to start server

#### docker
pull docker image from docker hub repository:
```
docker pull static-dev-server
```
then, start docker container:
```
docker run 
```

#### config
- ``process.env.PORT`` : the port for server to listen, default is 3000
- ``process.env.WATCH_PATH`` : the path the server will watch, default is 'workspace'
- ``process.env.WATHC_CMD`` : the command will be execute after change happen, default is ``npm run build``
- ``process.env.PUBLIC_PATH`` : the public path the server will serve, default is 'workspace/dist';
