# Laboramus Software Developer Case (OLILI DANIEL)

This is a reporting tool developed for my Laboramus developer interview

The app is built on NodeJs with NextJS and ReactJs as a framework

## CASE 1:

### Features
  - Upload sales csv report
  - Provide total profit metrics
  - Analyse for the top 5 profitable items

### Action process

  - Open app
  - App launches dashboard
  - if no data metrix to display
  - request user to upload cvs
  - else show metric (features_**)

## Setup Development Environment

In order to kickstart the apps, the very first thing you need to do is to setup a react development environment.

This setup is largely depended on wether you have docker installed on your machine or not.

**Select below for prefered option**

<hr />

<details>
  <summary>SETUP WITH DOCKER</summary>

  In the application`s root directory, run the command below to start the applications; (This might take some time depending on you internet speed and computer resources)

  ```
  docker-compose up
  ```

  The front-end will start on [http://localhost](http://localhost)
</details>


<details>
  <summary>SETUP WITHOUT DOCKER</summary>

  Following tools are needed to setup a react dev environment:

  - **Node JS**

    This will also come with an addtional package manager (NPM) in more recent versions. To download NodeJs, visit [NodeJs Website](http://nodejs.org/)

   Following tools are needed to setup a python environment:

  - **Python 3.^**

    This will also come with an addtional package manager (PIP) in more recent versions. To download Python, visit [Python Website](http://nodejs.org/)

  **Starting up the python backend**
  - In the root of the project is a folder named "**```server```**".
  - Open your teminal in the server directory and run the following comands in there order.

  ```
  python3 -m pip install -r requirements.txt

  python3 server.py
  ```

  **NB:** for WINDOWS OS

  ```
  pip install -r requirements.txt

  py server.py
  ```


  **Starting up the react front-end**
  - In the root of the project is a folder named "**```web```**".
  - Open your teminal in the web directory and run the following comands in there order.

  ```
  npm install

  npm run dev
  ```

  The front-end will start on [http://localhost:3000](http://localhost:3000)
</details>


# ```Points to note```

The app assumes the user is a store manager and is already logged in
