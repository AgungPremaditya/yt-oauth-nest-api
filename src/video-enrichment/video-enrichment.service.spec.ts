import { Test, TestingModule } from '@nestjs/testing';
import { VideoEnrichmentService } from './video-enrichment.service';

describe('VideoEnrichmentService', () => {
  let service: VideoEnrichmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoEnrichmentService],
    }).compile();

    service = module.get<VideoEnrichmentService>(VideoEnrichmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
