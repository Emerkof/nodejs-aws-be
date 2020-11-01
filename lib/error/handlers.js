import { NotFoundError } from './types';

export function handleError(error) {
  if (error instanceof NotFoundError) {
    return {
      statusCode: error.code,
      body: JSON.stringify({
        error: {
          message: error.message,
        },
      }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: {
        message: 'Something went wrong, please, try again later',
      },
    }),
  };
}
