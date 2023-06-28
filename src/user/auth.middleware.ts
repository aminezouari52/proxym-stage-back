import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { UserService } from './user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeaders = request.headers.authorization
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1]
      try {
        const decoded = jwt.verify(token, SECRET)
        if (typeof decoded !== 'string') {
          const user = await this.userService.findById(decoded.id)

          if (!user) {
            throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED)
          }

          request.user = user.user
          return true
        }
      } catch (err) {
        if (this.isTokenExpired(token)) {
          const error = {
            errorCode: 100,
            msg: 'Session expired',
          }
          throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
        const error = {
          errorCode: 101,
          msg: 'Invalid token',
        }
        throw new HttpException(error, HttpStatus.UNAUTHORIZED)
      }
    } else {
      const error = {
        errorCode: 102,
        msg: 'Not authorized',
      }
      throw new HttpException(error, HttpStatus.UNAUTHORIZED)
    }
  }

  private isTokenExpired = (token: string) =>
    Date.now() >=
    JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000
}
