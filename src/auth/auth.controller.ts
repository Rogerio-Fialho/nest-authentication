import { Controller, Post, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiBody({ type: AuthCredentialsDto })
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    console.log('signUp3:')
    return await this.authService.signUp(authCredentialsDto);
  }

  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({ status: 201, type: String })
  @ApiUnauthorizedResponse({description: 'Invalid credentials.'})
  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @ApiUnauthorizedResponse({description: 'Invalid credentials.'})
  test(@Body() body) {
    return body;
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getAllUsers() {
    return await this.authService.getAllUsers()
  }

}
