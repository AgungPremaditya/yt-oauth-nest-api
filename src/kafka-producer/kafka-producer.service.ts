import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { EnrichedVideo } from 'src/youtube/interfaces/enriched-youtube.interface';

@Injectable()
export class KafkaProducerService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'youtube-service',
        brokers: ['localhost:9092'],
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async emitEnrichedVideo(video: EnrichedVideo) {
    return this.client.emit('youtube-liked-video', video);
  }
}
