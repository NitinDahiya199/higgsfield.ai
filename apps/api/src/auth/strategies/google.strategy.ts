import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      if (!emails || !emails[0] || !emails[0].value) {
        return done(new Error("Google email not available"), undefined);
      }

      const user = {
        provider: "google",
        providerId: id,
        email: emails[0].value,
        name: name
          ? `${name.givenName || ""} ${name.familyName || ""}`.trim()
          : emails[0].value.split("@")[0],
        avatar: photos?.[0]?.value,
        accessToken,
      };

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
}
