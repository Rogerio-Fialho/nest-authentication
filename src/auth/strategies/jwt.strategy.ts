import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { Model } from 'mongoose';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TopMingleSecret'
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userModel.findOne({ email });

    if(!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}