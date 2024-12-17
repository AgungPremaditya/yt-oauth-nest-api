import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VideoEnrichmentService } from './video-enrichment/video-enrichment.service';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';

@Module({
  imports: [YoutubeModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, VideoEnrichmentService, KafkaProducerService],
})
export class AppModule {}
