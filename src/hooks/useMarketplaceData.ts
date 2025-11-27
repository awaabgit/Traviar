import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  MarketplaceItinerary,
  MarketplaceCreator,
  MarketplaceCollection,
  MarketplaceFilters,
} from '../types';

export function useMarketplaceData(filters: MarketplaceFilters, searchQuery: string) {
  const [itineraries, setItineraries] = useState<MarketplaceItinerary[]>([]);
  const [featuredItineraries, setFeaturedItineraries] = useState<MarketplaceItinerary[]>([]);
  const [trendingItineraries, setTrendingItineraries] = useState<MarketplaceItinerary[]>([]);
  const [collections, setCollections] = useState<MarketplaceCollection[]>([]);
  const [creators, setCreators] = useState<MarketplaceCreator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketplaceData();
  }, [filters, searchQuery]);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('marketplace_itineraries')
        .select(`
          *,
          creator:marketplace_creators(*)
        `);

      if (searchQuery) {
        query = query.or(
          `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,destination.ilike.%${searchQuery}%`
        );
      }

      if (filters.priceRange) {
        query = query
          .gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1]);
      }

      if (filters.duration && filters.duration.length === 2) {
        query = query
          .gte('duration_days', filters.duration[0])
          .lte('duration_days', filters.duration[1]);
      }

      if (filters.destinations && filters.destinations.length > 0) {
        query = query.in('destination', filters.destinations);
      }

      if (filters.styles && filters.styles.length > 0) {
        query = query.overlaps('style_tags', filters.styles);
      }

      if (filters.minRating) {
        query = query.gte('rating_avg', filters.minRating);
      }

      if (filters.hasVideo) {
        query = query.not('tiktok_video_id', 'is', null);
      }

      switch (filters.sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating_avg', { ascending: false });
          break;
        default:
          query = query.order('purchase_count', { ascending: false });
      }

      const { data: itinerariesData, error: itinerariesError } = await query;

      if (itinerariesError) throw itinerariesError;

      const { data: featuredData } = await supabase
        .from('marketplace_itineraries')
        .select(`
          *,
          creator:marketplace_creators(*)
        `)
        .eq('is_featured', true)
        .limit(5);

      const { data: trendingData } = await supabase
        .from('marketplace_itineraries')
        .select(`
          *,
          creator:marketplace_creators(*)
        `)
        .eq('is_trending', true)
        .order('tiktok_views', { ascending: false })
        .limit(10);

      const { data: collectionsData } = await supabase
        .from('marketplace_collections')
        .select('*')
        .order('sort_order');

      if (collectionsData) {
        const collectionsWithItineraries = await Promise.all(
          collectionsData.map(async (collection) => {
            if (collection.itinerary_ids && collection.itinerary_ids.length > 0) {
              const { data: collectionItineraries } = await supabase
                .from('marketplace_itineraries')
                .select(`
                  *,
                  creator:marketplace_creators(*)
                `)
                .in('id', collection.itinerary_ids);

              return {
                ...collection,
                itineraries: collectionItineraries || [],
              };
            }
            return { ...collection, itineraries: [] };
          })
        );
        setCollections(collectionsWithItineraries);
      }

      const { data: creatorsData } = await supabase
        .from('marketplace_creators')
        .select('*')
        .order('rating_avg', { ascending: false })
        .limit(10);

      setItineraries(itinerariesData || []);
      setFeaturedItineraries(featuredData || []);
      setTrendingItineraries(trendingData || []);
      setCreators(creatorsData || []);
    } catch (error) {
      console.error('Error fetching marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    itineraries,
    featuredItineraries,
    trendingItineraries,
    collections,
    creators,
    loading,
  };
}
