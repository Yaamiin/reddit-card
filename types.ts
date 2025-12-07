export interface CardState {
  username: string;
  avatarUrl: string;
  textContent: string;
  likeCount: string;
  commentCount: string;
  showVerified: boolean;
  trophies: string[];
}

export interface Trophy {
  id: string;
  emoji: string;
}