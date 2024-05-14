import * as bcryptjs from 'bcryptjs';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpAdminDTO } from './dto/signup-admin.dto';
import { SignUpAgentDTO } from './dto/signup-agent.dto';

@Injectable()
export class authService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<void> {
    
    const userExit = await this.userService.findByEmail(signUpDTO.email);
    if (userExit) {
      throw new BadRequestException('email is elready exist');
    }
    
    const hashadPass = bcryptjs.hashSync(signUpDTO.password as string, 8 as number);

    signUpDTO.password = hashadPass;

    const user = await this.userService.createUser(signUpDTO)

    if (!user) {
      throw new InternalServerErrorException('fail to add user');
    }
    
  }

  async signUpAdmin(signUpDTO: SignUpAdminDTO, superAdminId: string): Promise<void> {
    
    const userExit = await this.userService.findByEmail(signUpDTO.email);

    if (userExit) {
      throw new BadRequestException('email is elready exist');
    }
    
    const hashadPass = bcryptjs.hashSync(signUpDTO.password as string, 8 as number);

    signUpDTO.password = hashadPass;

    const user = await this.userService.createAdmin(signUpDTO, superAdminId)

    if (!user) {
      throw new InternalServerErrorException('fail to add user');
    }
    
  }

  async signUpAgent(signUpDTO: SignUpAgentDTO, admin: string): Promise<void> {
    
    const userExit = await this.userService.findByEmail(signUpDTO.email);

    if (userExit) {
      throw new BadRequestException('email is elready exist');
    }
    
    const hashadPass = bcryptjs.hashSync(signUpDTO.password as string, 8 as number);

    signUpDTO.password = hashadPass;

    const user = await this.userService.createAgent(signUpDTO, admin)

    if (!user) {
      throw new InternalServerErrorException('fail to add user');
    }
    
  }


  async logIn(body: SignInDto): Promise<object> {

    const { email, password } = body;

    const userExists = await this.userService.findByEmail(email);
    if (!userExists) {
      throw new BadRequestException('in-valid login credential');
    }

    const isPasswordMatch = bcryptjs.compareSync(
      password,
      userExists['password'],
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('in-valid login credential');
    }

    const token = this.jwtService.sign(
      {
        email: userExists['email'],
        id: userExists['_id'],
        role:  userExists['role'],
      },
      {
        secret: 'login',
        expiresIn: '1d'  
      },
    );
    
    return { message: 'Done', user: userExists, token };
  }
  
}
