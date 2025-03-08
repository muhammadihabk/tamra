import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
getRequest(context: ExecutionContext) {
    const gqlExecutionContext = GqlExecutionContext.create(context);

    return gqlExecutionContext.getContext().req;
  }
}
