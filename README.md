
# E-Commerce Mock API

An example REST API for small E-commerce website. Powered by ExpressJS, this example API
has endpoints for general users to create and manage their accounts, browse, review, and
save their favorite products. Admin users are able to add, remove, and update products,
preform administrative tasks such as delete offensive reviews or users.

future versions will include paths for searching and filtering products, a separate
containerized front-end to interact with the database and preform server side rendering
of the pages using Pug templating engine.


## Run Locally

Clone the project

```bash
  $ git clone https://github.com/Willmo103/Express-API-Dev.git
```

Go to the project directory

```bash
  $ cd Express-API-Dev
```

Build the project with docker-compose

```bash
  $ docker-compose build
```

Start the server

```bash
  $ docker-compose up
```

Fill the products table by making a GET request to:

```bash
  $ http://localhost:5000/api/v1/dev/buildTable
```

## Documentation

### API
[Postman API Documentation](https://documenter.getpostman.com/view/22094285/2s847ERZPf)

[Postman request collection json link](https://www.getpostman.com/collections/81b2c6067ac81eb7886c)
## Authors

- [@willmo103](https://github.com/Willmo103)

