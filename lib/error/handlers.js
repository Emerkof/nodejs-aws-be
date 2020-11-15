import { NotFoundError, BadRequestError } from './types';

export function handleError(error) {
  if (error instanceof NotFoundError || error instanceof BadRequestError) {
    return {
      statusCode: error.code,
      body: JSON.stringify({
        error: {
          message: error.message,
        },
      }),
    };
  }

  console.error(error);

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: {
        message: 'Something went wrong, please, try again later',
      },
    }),
  };
}
