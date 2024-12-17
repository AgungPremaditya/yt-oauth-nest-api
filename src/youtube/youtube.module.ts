import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { HttpModule } from '@nestjs/axios';
import { VideoEnrichmentService } from 'src/video-enrichment/video-enrichment.service';
import { KafkaProducerService } from 'src/kafka-producer/kafka-producer.service';

@Module({
  imports: [HttpModule],
  providers: [YoutubeService, VideoEnrichmentService, KafkaProducerService],
  controllers: [YoutubeController],
  exports: [VideoEnrichmentService],
})
export class YoutubeModule {}
