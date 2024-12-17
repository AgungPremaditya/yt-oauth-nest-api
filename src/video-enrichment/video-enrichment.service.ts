import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { EnrichedVideo } from 'src/youtube/interfaces/enriched-youtube.interface';

@Injectable()
export class VideoEnrichmentService {
  private youtube = google.youtube('v3');

  async enrichVideo(
    videoId: string,
    accessToken: string,
  ): Promise<EnrichedVideo> {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const videoResponse = await this.youtube.videos.list({
      auth: oauth2Client,
      part: ['snippet', 'statistics', 'contentDetails'],
      id: [videoId],
    });

    const video = videoResponse.data.items[0];

    return {
      videoId: video.id,
      title: video.snippet.title,
      categoryId: video.snippet.categoryId,
      tags: video.snippet.tags || [],
      description: video.snippet.description,
      statistics: {
        viewCount: Number(video.statistics.viewCount),
        likeCount: Number(video.statistics.likeCount),
        commentCount: Number(video.statistics.commentCount),
      },
      duration: video.contentDetails.duration,
      publishedAt: video.snippet.publishedAt,
      userInteraction: {
        likedAt: new Date(),
        watchCount: 1,
        lastWatched: new Date(),
      },
    };
  }
}
