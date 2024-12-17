export interface EnrichedVideo {
  videoId: string;
  title: string;
  categoryId: string;
  tags: string[];
  description: string;
  statistics: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
  };
  duration: string;
  publishedAt: string;
  userInteraction: {
    likedAt: Date;
    watchCount: number;
    lastWatched: Date;
  };
}
