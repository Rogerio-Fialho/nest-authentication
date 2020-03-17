import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-saml';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { Model } from 'mongoose';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') { 
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      entryPoint: 'https://mingle.customerfi.com/cloudpass/launchpad/launchApp/dc30a25d3b9211eabc68be6b0796fb68/dc62500c362d11ea96442eb78d27db37',
      issuer: 'TotvsLabs',
      cert: fs.readFileSync('./src/auth/strategies/mingle.customerfi.com.pem', 'utf-8'),
    }, function(profile, done) {
      console.log('chamou')
      return this.validate(profile, done);
    });
  }

  async validate(profile, done) {
    console.log('PROFILE', profile);
    const { nameID, userId } = profile;
    const email = nameID;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      // Registra novo usuário na base do Desenhador
      // Verificar a Role do usuário
      // Verificar se vai abrir tela de cadastro ou ir direto para dashboard
    }

    // console.log('nameID', nameID);
    // console.log('userId', userId);

    return done(null, nameID);
  }

}
