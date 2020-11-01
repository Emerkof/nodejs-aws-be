import { handleError } from '../error';

export function handleResponseDecorator(fn) {
  return async function(event) {
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };

    try {
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
