// function to send a json object
const respond = (request, response, status, object, type) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': type });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // send our json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';

    if (acceptedTypes === 'text/xml') {
      const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
      return respond(request, response, responseXML, 'text/xml');
    }
    // return our json with a 400 bad request code
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, params, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing logged in query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';

    if (acceptedTypes === 'text/xml') {
      const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
      return respond(request, response, responseXML, 'text/xml');
    }
    // return our json with a 401 unauthorized code
    return respond(request, response, 401, responseJSON, 'application/json');
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // return our json with a 403 forbidden error code
  return respond(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // return our json with a 500 internal error code
  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // return our json with a 501 not implemented error code
  return respond(request, response, 501, responseJSON, 'application/json');
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes === 'text/xml') {
    const responseXML = `
        <response>
            <message>${responseJSON.message}</message>
        </response>`;
    return respond(request, response, responseXML, 'text/xml');
  }

  // return our json with a 404 not found error code
  return respond(request, response, 404, responseJSON, 'application/json');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
