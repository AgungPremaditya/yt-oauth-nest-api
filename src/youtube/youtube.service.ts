import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}

  async getLikedVideos(accessToken: string) {
    const url = 'https://www.googleapis.com/youtube/v3/videos';
    const params = {
      part: 'snippet,contentDetails',
      myRating: 'like',
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await this.httpService.axiosRef.get(url, {
        params,
        headers,
      });
      return response.data.items;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException(
          'Invalid or expired YouTube access token',
        );
      }
      throw error;
    }
  }
}
