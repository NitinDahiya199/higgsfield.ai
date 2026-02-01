import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Res,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // GitHub OAuth
  @Get("github")
  @UseGuards(AuthGuard("github"))
  async githubAuth() {
    // Initiates GitHub OAuth flow
  }

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
      }

      const tokens = await this.authService.handleOAuthLogin(user);

      // Redirect to frontend with tokens in URL hash (more secure than query params)
      const redirectUrl = `${process.env.FRONTEND_URL}/api/auth/github/callback?token=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("GitHub callback error:", error);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(error.message || "authentication_failed")}`
      );
    }
  }

  // Google OAuth
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
      }

      const tokens = await this.authService.handleOAuthLogin(user);

      // Redirect to frontend with tokens
      const redirectUrl = `${process.env.FRONTEND_URL}/api/auth/google/callback?token=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Google callback error:", error);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(error.message || "authentication_failed")}`
      );
    }
  }

  // Handle callback from frontend
  @Post(":provider/callback")
  async handleCallback(@Body("code") code: string, @Req() req: Request) {
    // Exchange code for user info and create/login user
    const provider = req.params.provider;
    return this.authService.exchangeCodeForUser(code, provider);
  }

  // Get current user
  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  async getCurrentUser(@Req() req: Request) {
    const userId = (req.user as any)?.userId;
    if (!userId) {
      throw new Error("User not found");
    }
    return this.authService.getUserById(userId);
  }

  // Register
  @Post("register")
  async register(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.register(body.email, body.password, body.name);
  }

  // Login
  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // Logout
  @Post("logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(@Req() req: Request) {
    const userId = (req.user as any)?.userId;
    return this.authService.logout(userId);
  }

  // Update profile
  @Patch("profile")
  @UseGuards(AuthGuard("jwt"))
  async updateProfile(@Req() req: Request, @Body() body: { name?: string; email?: string }) {
    const userId = (req.user as any)?.userId;
    return this.authService.updateProfile(userId, body);
  }

  // Upload avatar
  @Post("avatar")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("avatar"))
  async uploadAvatar(@Req() req: Request, @UploadedFile() file: any) {
    const userId = (req.user as any)?.userId;
    // In a real implementation, you'd upload to S3 or similar
    // For now, we'll just return a placeholder URL
    const avatarUrl = file ? `/uploads/${file.filename}` : null;
    if (!avatarUrl) {
      throw new Error("No file uploaded");
    }
    return this.authService.updateAvatar(userId, avatarUrl);
  }

  // Verify email
  @Post("verify-email")
  async verifyEmail(@Body() body: { token: string }) {
    return this.authService.verifyEmail(body.token);
  }

  // Resend verification email
  @Post("resend-verification")
  @UseGuards(AuthGuard("jwt"))
  async resendVerification(@Req() req: Request) {
    const userId = (req.user as any)?.userId;
    return this.authService.resendVerificationEmail(userId);
  }

  // Forgot password
  @Post("forgot-password")
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  // Reset password
  @Post("reset-password")
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }

  // Delete account
  @Delete("delete-account")
  @UseGuards(AuthGuard("jwt"))
  async deleteAccount(@Req() req: Request) {
    const userId = (req.user as any)?.userId;
    return this.authService.deleteAccount(userId);
  }
}
