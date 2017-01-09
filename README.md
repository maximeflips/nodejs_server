# Node.JS Server

This readme help you to build and run the current part of the project.
Slides: http://slides.com/adrienfenech/mti-devops/fullscreen

## Using command line and Dockerfile:

Firstly, build the project

```
docker build -t username/nodejs_server .
```

In this command, you specify a tag to retrieve a specific build, and use `.` to specify that the current directory contains the `Dockerfile`.

then, run it:

```
docker run -i -p 80:8080 --name=nodejs_server username/nodejs_server
```

With this command, you tell docker to keep an interactive mode with `-i` which lets you execute command if needed. In this case, you can see that the server is running, and simply `ctrl + c` to kill it if needed.

You also specify you want to bind the port `8080` used by the container (see `Dockerfile -> EXPOSE 8080` & `server.js` which listen on port `8080`) with the port `80` of the host (your machine) using the option `-p`. 

Finally, you named your container to easily retrieve it.

After you have launched the container, you can see it running with the command `docker ps`. You can also list each container you already build & run with `docker ps -a` and see there current status. Then, you can stop one (`docker stop <image_name>`) or remove one (`docker rm <image_name>`).

## Using docker-compose:

You can also build and run this project with docker-compose.
For this, use:

```
docker-compose up
```

This command will build and run each application contains by the `docker-compose.yml` file. You can also specify option like `-d` to run the image in detached mode.

## Access to the page using navigator

For those who are running on Windows, you cannot access to the server via `localhost`. In fact, the docker-machine on which you are running created a specific environment which can be accessed with an ip address. To find it, use

```
docker-machine ip
```