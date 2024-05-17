import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { authService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { RoleGuard } from 'src/modules/Auth/role.guard';
import { SignUpAdminDTO } from './dto/signup-admin.dto';
import { SignUpAgentDTO } from './dto/signup-agent.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from './auth.guard';
import { MailService } from '../notifications/mail.service';

@Controller({ path: 'auth' })
export class authController {

  constructor(private readonly signupService: authService, private mailService: MailService) {}

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    await this.signupService.signUp(signUpDTO);
    return { message: "User Successfully Created"};
  }

  @Roles(['Super Admin', 'Admin'])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('signup/admin')
  async signUpAdmin(@Body() signUpDTO: SignUpAdminDTO, @Req() req) {
    await this.signupService.signUpAdmin(signUpDTO, req.user.id);
    return { message: "Admin Successfully Created"};
  }

  @Roles(['Admin'])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('signup/agent')
  async signUpAgent(@Body() signUpDTO: SignUpAgentDTO, @Req() req) {
    await this.signupService.signUpAgent(signUpDTO, req.user.id);
    return { message: "Agent Successfully Created"};
  }

  @Post('login')
  async loginHandler(@Body() signInDto: SignInDto) {
    return await this.signupService.logIn(signInDto);
  }
}
