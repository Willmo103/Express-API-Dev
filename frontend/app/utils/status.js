class Status {
  constructor() {}
  serverError = (error) => {
    console.log(error);
    return {
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    };
  };

  notFound = (item) => {
    return {
      status: "404 - NON FOUND",
      details: `${item} does not exist.`,
    };
  };

  conflict = (item) => {
    return {
      status: "409 - CONFLICT",
      details: `${item} already exists.`,
    };
  };

  deleted = (item) => {
    return {
      status: "204 - NO CONTENT",
      details: `${item} successfully deleted.`,
    };
  };

  empty = (data) => {
    return {
      status: "200 - SUCCESS",
      details: "currently nothing to show",
      data: data,
    };
  };

  success = (data) => {
    return {
      status: "200 - SUCCESS",
      data: data,
    };
  };

  jwtToken = (token) => {
    return {
      status: "200 - SUCCESS",
      "token-type": "Bearer",
      token: token,
    };
  };

  badLogin = () => {
    return {
      status: "400 - BAD REQUEST",
      details: "Invalid credentials. Unable to login",
    };
  };

  created = (data) => {
    return {
      status: "201 - CREATED",
      details: "created new resource",
      data: data,
    };
  };

  unauthorized = () => {
    return {
      status: "401 - UNAUTHORIZED ACCESS",
      details: `Not authorized. Please Login.`,
    };
  };

  forbidden = (error) => {
    return {
      status: "403 - FORBIDDEN",
      details: `Not authorized. Please Login.`,
      error: error,
    };
  };
}

const status = new Status();
module.exports = status;
