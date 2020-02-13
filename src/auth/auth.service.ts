import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private httpService: HttpService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    
    const { password } = authCredentialsDto;
    
    const user = this.userModel(authCredentialsDto);

    user.password = await this.hashPassword(password, 10);

    try {
      return await user.save();
    } catch (error) {
      if(error.code == '11000') {
        throw new ConflictException('E-mail already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const email = await this.validateUser(authCredentialsDto);
      
    if(!email) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload: JwtPayload = { email };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;

    const user = await this.userModel.findOne({ email });

    if(user && await this.validatePassword(user.password, password)) {
      return user.email;
    } else {
      return null;
    }

  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async testExternalConnection() {
    const value = this.httpService.get('http://localhost:9000/auth/user');
    return value;
  }
  
  async validatePassword(userPassword: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  private async hashPassword(password: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }
}
