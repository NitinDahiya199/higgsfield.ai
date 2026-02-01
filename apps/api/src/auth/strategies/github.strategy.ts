import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GITHUB_CALLBACK_URL"),
      scope: ["user:email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { id, username, displayName, emails, photos } = profile;

    // GitHub might not return email if user hasn't made it public
    // We need to fetch it from GitHub API
    let email = emails?.[0]?.value;

    if (!email) {
      try {
        const response = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        const emailData = await response.json();
        email = emailData.find((e: any) => e.primary)?.email || emailData[0]?.email;
      } catch (error) {
        console.error("Failed to fetch GitHub email:", error);
      }
    }

    if (!email) {
      return done(
        new Error("GitHub email not available. Please make your email public in GitHub settings."),
        undefined
      );
    }

    const user = {
      provider: "github",
      providerId: id,
      email,
      name: displayName || username || `github-${id}`,
      avatar: photos?.[0]?.value,
      accessToken,
    };

    done(null, user);
  }
}
