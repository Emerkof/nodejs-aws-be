import { handleError } from '../error';

export function handleRequestResponseDecorator(fn) {
  return async function(event = {}) {
    console.log('INCOMING REQUEST EVENT: ', event);

    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };

    try {
      let parsedBody = event.body;

      try {
        parsedBody = JSON.parse(event.body);
      } catch (error) {
      } finally {
        event.body = parsedBody;
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
