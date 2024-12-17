import { Controller, Get, Headers } from '@nestjs/common';
import { VideoEnrichmentService } from 'src/video-enrichment/video-enrichment.service';
import { KafkaProducerService } from 'src/kafka-producer/kafka-producer.service';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly videoEnrichmentService: VideoEnrichmentService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  @Get('liked-videos')
  async getLikedVideos(@Headers('authorization') accessToken: string) {
    const likedVideos = await this.youtubeService.getLikedVideos(accessToken);
    return likedVideos;
  }

  @Get('liked-videos-kafka')
  async getLikedVideosKafka(@Headers('authorization') accessToken: string) {
    // Get liked videos from YouTube API
    const likedVideos = await this.youtubeService.getLikedVideos(accessToken); // Your existing liked videos fetch logic

    // Enrich each video with metadata
    const enrichedVideos = await Promise.all(
      likedVideos.map((video) =>
        this.videoEnrichmentService.enrichVideo(video.id, accessToken),
      ),
    );

    // Emit each enriched video to Kafka
    enrichedVideos.forEach((video) =>
      this.kafkaProducerService.emitEnrichedVideo(video),
    );

    return enrichedVideos;
  }
}
