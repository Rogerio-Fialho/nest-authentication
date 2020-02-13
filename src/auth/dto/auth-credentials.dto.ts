import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/user-role.enum';

export class AuthCredentialsDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email.',
    required: true,
    type: String
  })
  email: string;
  
  @ApiProperty({
    description: 'User role.',
    enum: UserRole
  })
  userRole: UserRole;
  
  @IsString()
  @ApiProperty({
    description: 'User password.',
    type: String
  })
  password: string;
  
}