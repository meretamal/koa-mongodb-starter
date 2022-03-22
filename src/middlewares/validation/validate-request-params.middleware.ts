import { Next } from 'koa';
import { RouterContext } from '@koa/router';
import { SchemaOf, ValidationError } from 'yup';

export function vaidateRequestParamsMiddleware<Type>(
  validationSchema: SchemaOf<Type>,
) {
  return async function validate(ctx: RouterContext, next: Next) {
    try {
      await validationSchema.validate(ctx.params, {
        abortEarly: false,
      });
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        ctx.throw(404, {
          errors: error.errors,
        });
      } else {
        throw error;
      }
    }
  };
}
