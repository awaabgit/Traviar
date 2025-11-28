export interface SocialLinks {
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  about_me?: string;
  is_creator: boolean;
  travel_style: string[];
  preferred_budget_range: 'low' | 'medium' | 'high';
  follower_count: number;
  following_count: number;
  years_of_travel?: number;
  cities_visited?: number;
  languages?: string[];
  places_specialized?: string[];
  creator_highlights?: string[];
  social_links?: SocialLinks;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  creator_id: string;
  creator?: Profile;
  title: string;
  description?: string;
  cover_image_url?: string;
  video_url?: string;
  destination: string;
  duration_days: number;
  price: number;
  vibe_tags: string[];
  budget_level: 'low' | 'medium' | 'high';
  is_published: boolean;
  view_count: number;
  save_count: number;
  purchase_count: number;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface Itinerary {
  id: string;
  user_id: string;
  source_trip_id?: string;
  title: string;
  destination?: string;
  start_date?: string;
  end_date?: string;
  total_budget: number;
  spent_budget: number;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  days?: ItineraryDay[];
}

export interface ItineraryDay {
  id: string;
  itinerary_id: string;
  day_number: number;
  title?: string;
  notes?: string;
  created_at: string;
  items?: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day_id: string;
  category: 'accommodation' | 'restaurant' | 'attraction' | 'activity' | 'transport' | 'other';
  title: string;
  description?: string;
  location_name?: string;
  location_lat?: number;
  location_lng?: number;
  start_time?: string;
  duration_minutes?: number;
  cost: number;
  booking_url?: string;
  sort_order: number;
  created_at: string;
}

export interface SavedTrip {
  user_id: string;
  trip_id: string;
  created_at: string;
  trip?: Trip;
}

export interface TripPurchase {
  id: string;
  user_id: string;
  trip_id: string;
  amount_paid: number;
  created_at: string;
  trip?: Trip;
}

export interface TripReview {
  id: string;
  trip_id: string;
  user_id: string;
  user?: Profile;
  rating: number;
  comment?: string;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  itinerary_id?: string;
  role: 'user' | 'assistant';
  message: string;
  created_at: string;
}

export interface TravelVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url?: string;
  creator_username: string;
  creator_avatar_url?: string;
  creator_user_id?: string;
  source_platform: 'traviar' | 'tiktok';
  external_video_id?: string;
  location_name: string;
  location_country: string;
  location_lat?: number;
  location_lng?: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
  tags?: VideoTag[];
  comments?: VideoComment[];
  is_liked?: boolean;
  is_saved?: boolean;
}

export interface VideoComment {
  id: string;
  video_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  updated_at: string;
  user?: {
    username: string;
    avatar_url?: string;
  };
}

export interface VideoLike {
  id: string;
  video_id: string;
  user_id: string;
  created_at: string;
}

export interface VideoSave {
  id: string;
  video_id: string;
  user_id: string;
  created_at: string;
}

export interface VideoTag {
  id: string;
  video_id: string;
  tag_name: string;
  created_at: string;
}

export type ViewMode = 'explore' | 'itinerary' | 'marketplace' | 'budget' | 'chat' | 'collections' | 'profile' | 'dashboard' | 'edit-profile';
export type RightPanelMode = 'map' | 'chat';

export interface MarketplaceCreator {
  id: string;
  user_id?: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  specialty: string;
  rating_avg: number;
  itinerary_count: number;
  total_sales: number;
  is_verified: boolean;
  created_at: string;
}

export interface MarketplaceItinerary {
  id: string;
  creator_id: string;
  creator?: MarketplaceCreator;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price: number;
  discount_price?: number;
  cover_image_url: string;
  rating_avg: number;
  rating_count: number;
  purchase_count: number;
  is_featured: boolean;
  is_trending: boolean;
  style_tags: string[];
  tiktok_video_id?: string;
  tiktok_views: number;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceCollection {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  itinerary_ids: string[];
  sort_order: number;
  created_at: string;
  itineraries?: MarketplaceItinerary[];
}

export interface MarketplacePurchase {
  id: string;
  user_id: string;
  itinerary_id: string;
  amount_paid: number;
  purchase_date: string;
  itinerary?: MarketplaceItinerary;
}

export interface MarketplaceReview {
  id: string;
  itinerary_id: string;
  user_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
  user?: {
    username: string;
    avatar_url?: string;
  };
}

export interface MarketplaceFilters {
  priceRange?: [number, number];
  duration?: number[];
  destinations?: string[];
  styles?: string[];
  minRating?: number;
  hasVideo?: boolean;
  sortBy?: 'popular' | 'newest' | 'price_low' | 'price_high' | 'rating';
}

export interface PlaceDetail {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  images: string[];
  address: string;
  phone?: string;
  website?: string;
  latitude: number;
  longitude: number;
  openingHours?: OpeningHours;
  amenities: string[];
  tags: string[];
  vibes: string[];
  suggestedDuration?: string;
  bestFor?: string[];
  bestTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  bookingUrl?: string;
  reviews?: PlaceReview[];
  reviewSummary?: ReviewSummary;
  creatorContent?: CreatorContent[];
  nearbyPlaces?: NearbyPlace[];
}

export interface OpeningHours {
  isOpenNow: boolean;
  closesAt?: string;
  schedule: {
    day: string;
    hours: string;
  }[];
}

export interface PlaceReview {
  id: string;
  username: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  platform?: 'google' | 'yelp' | 'tripadvisor' | 'traviar';
}

export interface ReviewSummary {
  overallRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  keywords: string[];
}

export interface CreatorContent {
  id: string;
  type: 'video' | 'guide' | 'photo';
  thumbnailUrl: string;
  videoUrl?: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'traviar';
  creatorHandle: string;
  title: string;
  viewCount?: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  imageUrl: string;
  priceLevel?: string;
}
