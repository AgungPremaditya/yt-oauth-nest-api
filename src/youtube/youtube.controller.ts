import { Controller, Get, Headers } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('liked-videos')
  async getLikedVideos(@Headers('authorization') accessToken: string) {
    const likedVideos = await this.youtubeService.getLikedVideos(accessToken);
    return likedVideos;
  }
}
