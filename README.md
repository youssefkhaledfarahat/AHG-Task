Greetings And Salutations.

This readme will cover all the technologies used as well as the different functioanlities of this application, in small concise points.

The Stack that was used to create this app was the MERN stack. Mongo, Express, React, Node.

The project is divided into 2 folders, backend and frontend, naturally. The frontend was implemented using React, while the backend was implemented using Express, Mongo, and Node.

The Frontend contains
  1- Login, Register, Main using .jsx format, to prove that I know stuff, no matter how basic it is.
  2- The Employee Managment system itself inside the pages folder, that was built on design css elements from bootstrap. I'm not a designer.
  3- The Link between the API's and the frontend functioanlity was done with the ever so simple and lovely Axios. Thank God For Axios.
  4- React Routing was used because, you know, React, but mainly due its collective nature. Basically, it uploads the entire website in one container for you to traverse that container freely with no loading lag. Cool!
  5- All the inputs of the Logging In and Signing Up are traditional in their format 'Youssef#potato' is not an email, and '14235' is not a good password, data breaches did happen before
  6- Finally, a failed docker attempt. Mainly due to the fact that Docker wanted me to play with my computers bellybutton, I decided to skip that part, but if someone has docker they should be able to 'docker-compose up' and it "definitely" will work
The Backend contains
  1. the config file that has the enviroment that MongoDB will run on
  2. An Employee Controller, that contains all the Employee APIs in one collective space (my attempt at clean architecture)
  3. The db file that contains the Connection script that basically connects to the Database
  4. The Models folder that has the Employee Model, and the User model. Basic but requirements usually are
  5. The routes folder that contains 
    A. The JWT authoriazation of the logging in, gotta stay safe with JWTs. 
    B. the CSV Upload Route (which actually handles uploaded .xlsx files). 
    C. The Employee Route that has all the Employee functioanlies such as add, delete, update, view.
    D. The User Route that has User Credintials logic
  6. The App script, that handles all the puzzle building, making no sense into sense.
  7. Finally, the server script, that links all the pieces together.

APIs Created:
1. Log In
2. Sign Up
3. Upload CSV (Upload xlsx, shhhhh...)
4. View Employees
5. Delete Employees
6. Add Employees
7. Edit Employees
8. CRUDs FTW

Libraries Used:
I. Backend
  1. JWT
  2. bcrypt
  3. joi
  4. express
  5. multer
  6. mongoose
  7. cors
  8. cookie-parser
II. Frontend
  1. Axios
  2. JWT
  3. Swal
  4. react-router-dom
  5. Bootstrap (still not a designer)

To Run This App
1. 'npm run start' on the frontend
2. 'node server.js' on the backend
