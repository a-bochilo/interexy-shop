# interexy-shop

Step-by-step how to start application in docker in development mode:

1. Clone git repository to your local machine.
2. Open terminal in root directory of the application.
3. Ensure that ports 8000, 8080, 3002, 5432 are free on your machine.
4. Enter command 'docker-compose up' in the terminal.
5. Once installation complete check if 5 containers started in docker desktop app.
   It's recommended to restart containers in order to increase performance.
6. Now you have fully working application. On client side it's empty at the moment.
   Admin side could be used as it is. Superadmin user and two user roles
   (superadmin and user) already exist in database.
7. Follow link http://localhost:8000 to visit client part of the application.
8. Follow link http://localhost:8080 to visit admin part of the application.
9. Sign up as superadmin with login: 'superadmin@gmail.com' and password: '123123123'.
10. Once previous step done you are authorized to manage application (inc. add, edit
    and delete products and roles).
11. Add some products to test full functionallity of client side of the application.
