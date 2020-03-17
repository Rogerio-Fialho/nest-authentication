import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Response } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiBody({ type: AuthCredentialsDto })
  @Post('signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({ status: 201, type: String })
  @ApiUnauthorizedResponse({description: 'Invalid credentials.'})
  @Post('signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @Post('test')
  @ApiUnauthorizedResponse({description: 'Invalid credentials.'})
  test(@Body() body) {
    return body;
  }

  @Post('login')
  @UseGuards(AuthGuard('saml'))
  login(@Response() response) {
    return this.authService.login(response);
  }

  @Get('authenticate-user')
  getAuthenticatedUser() {
    return this.authService.authenticatedUser();
  }

  @Get('user')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

}
