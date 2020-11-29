import { handleError } from '../error';
import Logger from '../logger';

function bodyParser(request) {
  if (!request.body) {
    return;
  }

  let parsedBody;

  try {
    parsedBody = JSON.parse(request.body);

    return parsedBody;
  } catch (error) {
    Logger.log(Logger.logLevels.INFO, error);

    throw error;
  }
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
}

export function handleRequestResponseDecorator(fn, options = { cors: true, bodyParser: true }) {
  return async function(event = {}) {
    Logger.log(Logger.logLevels.INFO, 'INCOMING REQUEST EVENT: ', event);

    const response = { headers: {} };

    if (options.cors) {
      response.headers = { ...response.headers, ...cors() };
    }

    try {
      if (options.bodyParser) {
        event.body = bodyParser(event);
      }

      const result = await fn(event);

      response.statusCode = 200;
      response.body = typeof result === 'string' ? result : JSON.stringify(result);

      return response;
    } catch (error) {
      return {
        ...response,
        ...handleError(error),
      }
    }
  }
}
