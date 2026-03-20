import { useEffect, useCallback } from 'react';

interface PageView {
  path: string;
  timestamp: string;
  referrer?: string;
}

interface Event {
  type: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
}

export function useAnalytics() {
  const trackPageView = useCallback((path: string) => {
    const pageView: PageView = {
      path,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
    };

    // Store in localStorage for now (can be replaced with real analytics)
    const views = JSON.parse(localStorage.getItem('drevaia-pageviews') || '[]');
    views.push(pageView);
    localStorage.setItem('drevaia-pageviews', JSON.stringify(views.slice(-1000)));

    // Also track in session
    const sessionViews = JSON.parse(sessionStorage.getItem('drevaia-session-views') || '[]');
    sessionViews.push(pageView);
    sessionStorage.setItem('drevaia-session-views', JSON.stringify(sessionViews));
  }, []);

  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    const event: Event = {
      type: 'event',
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
    };

    const events = JSON.parse(localStorage.getItem('drevaia-events') || '[]');
    events.push(event);
    localStorage.setItem('drevaia-events', JSON.stringify(events.slice(-500)));
  }, []);

  const getPageViews = useCallback((path?: string) => {
    const views = JSON.parse(localStorage.getItem('drevaia-pageviews') || '[]');
    if (path) {
      return views.filter((v: PageView) => v.path === path).length;
    }
    return views.length;
  }, []);

  const getUniqueVisitors = useCallback(() => {
    const views = JSON.parse(localStorage.getItem('drevaia-pageviews') || '[]');
    const uniquePaths = new Set(views.map((v: PageView) => v.path));
    return uniquePaths.size;
  }, []);

  const getPopularContent = useCallback((limit = 10) => {
    const views = JSON.parse(localStorage.getItem('drevaia-pageviews') || '[]');
    const counts: Record<string, number> = {};
    
    views.forEach((v: PageView) => {
      counts[v.path] = (counts[v.path] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([path, count]) => ({ path, count }));
  }, []);

  return {
    trackPageView,
    trackEvent,
    getPageViews,
    getUniqueVisitors,
    getPopularContent,
  };
}

// Hook to track page views automatically
export function usePageTracking(path: string) {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(path);
  }, [path, trackPageView]);
}
