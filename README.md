# Node.JS Server
___

## DevOps - I:

This readme help you to build and run the current part of the project.
Slides: http://slides.com/adrienfenech/mti-devops/fullscreen

### Using command line and Dockerfile:

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

### Using docker-compose:

You can also build and run this project with docker-compose.
For this, use:

```
docker-compose up
```

This command will build and run each application contains by the `docker-compose.yml` file. You can also specify option like `-d` to run the image in detached mode.

### Access to the page using navigator

For those who are running on Windows, you cannot access to the server via `localhost`. In fact, the docker-machine on which you are running created a specific environment which can be accessed with an ip address. To find it, use

```
docker-machine ip
```

___

## DevOps - II:

This readme help you to build and run the current part of the project.
Slides: http://slides.com/adrienfenech/devops_tp1/fullscreen

### Part 1

Fork this repo :)

### Part 2

Create a new branch and switch on it:

```git
git branch dev
git checkout dev
```

Create an account on DockerHub,.
Go to **create** -> **create automated build**.
Select the project's repo from your github account and replace the *master* branch by the *dev* one.

###Part 3

Create an account on CircleCI.
Create new project using your repo.
Add the *circle.yml* file as the root of your project
```yml
# Specify that we will use docker
machine:
  services:
    - docker

# Specify that we will firstly run our project (in daemon mode)
# and finally use mocha to run the test suit.
test:
  override:
    - docker-compose up -d
    - mocha
```

### Part 4

Check the *test.js* file inside the *test* directory.

### Part 5

Go to the **build settings** of your Docker Hub project
Uncheck "*When active, builds will happen automatically on pushes*"
Click on "*Activte Triggers*"
Go to the **Project Settings** -> **Environment Variables**
Create new varaible with:

* Key : `DEPLOY`
* Value : `curl -H "Content-Type: application/json" --data '{"build": true}' -X POST <Trigger URL>` with `<Trigger URL>` the url from Docker Hub Triggers.

Fix your *circle.yml* file:
```yml
# Specify that we will use docker
machine:
  services:
    - docker

# Specify that we will firstly run our project (in daemon mode)
# and finally use mocha to run the test suit.
test:
  override:
    - docker-compose up -d
    - mocha

# Specify to execute the $DEPLOY command for the deployment
deployment:
  hub:
    branch: dev
    commands:
      - $DEPLOY
```

