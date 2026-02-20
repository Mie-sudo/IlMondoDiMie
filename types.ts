
export interface RSSItem {
  title: string;
  link: string;
  pubDate?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface WeatherData {
  temp: string;
  condition: string;
  location: string;
}
