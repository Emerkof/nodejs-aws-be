import { handleError } from '../error';

export function handleResponseDecorator(fn) {
  return async function(event) {
    try {
      const result = await fn(event);

      return {
        statusCode: 200,
        body: typeof result === 'string' ? result : JSON.stringify(result),
      };
    } catch (error) {
      return handleError(error);
    }
  }
}
