import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  private tokenStore = new Map<string, TokenPair>();

  constructor(private readonly httpService: HttpService) {}

  storeTokens(userId: string, tokens: TokenPair) {
    this.tokenStore.set(userId, tokens);
  }

  async getValidAccessToken(userId: string): Promise<string> {
    const tokens = this.tokenStore.get(userId);
    if (!tokens) {
      throw new UnauthorizedException('No tokens found for user');
    }

    const isExpired = this.isTokenExpired(tokens);
    if (isExpired) {
      const newTokens = await this.refreshTokens(tokens.refreshToken);
      this.storeTokens(userId, newTokens);
      return newTokens.accessToken;
    }

    return tokens.accessToken;
  }

  private isTokenExpired(tokens: TokenPair): boolean {
    const currentTime = Date.now();
    return currentTime >= tokens.expiresIn;
  }

  private async refreshTokens(refreshToken: string): Promise<TokenPair> {
    const response = await this.httpService.axiosRef.post(
      'https://oauth2.googleapis.com/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
      },
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token || refreshToken,
      expiresIn: Date.now() + response.data.expires_in * 1000,
    };
  }
}
