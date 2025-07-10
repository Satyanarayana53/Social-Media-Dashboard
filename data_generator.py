import random
import datetime
from typing import List, Dict, Any

class DataGenerator:
    """Generates realistic mock data for social media analytics"""
    
    def __init__(self):
        self.platforms = {
            'twitter': {'color': '#1DA1F2', 'name': 'Twitter'},
            'instagram': {'color': '#E4405F', 'name': 'Instagram'},
            'facebook': {'color': '#4267B2', 'name': 'Facebook'},
            'linkedin': {'color': '#0077B5', 'name': 'LinkedIn'}
        }
        
        # Base follower counts for realistic growth
        self.base_followers = {
            'twitter': 15000,
            'instagram': 8500,
            'facebook': 12000,
            'linkedin': 3500
        }
        
        # Seed random for consistent demo data
        random.seed(42)
    
    def get_overview_stats(self, platforms: List[str], days: int) -> Dict[str, Any]:
        """Generate overview statistics"""
        total_followers = sum(self.base_followers[p] + random.randint(0, 5000) for p in platforms)
        total_engagement = sum(random.randint(500, 2000) for _ in platforms)
        total_posts = sum(random.randint(10, 50) for _ in platforms)
        avg_sentiment = random.uniform(0.6, 0.9)
        
        return {
            'total_followers': total_followers,
            'total_engagement': total_engagement,
            'total_posts': total_posts,
            'avg_sentiment': round(avg_sentiment, 2),
            'follower_growth': f"+{random.randint(50, 500)}",
            'engagement_rate': f"{random.uniform(2.5, 8.5):.1f}%"
        }
    
    def get_engagement_data(self, platforms: List[str], days: int) -> Dict[str, Any]:
        """Generate engagement metrics data"""
        # Use specific date range: Jan 2022 - Feb 12, 2023
        start_date = datetime.datetime(2022, 1, 1)
        end_date = datetime.datetime(2023, 2, 12)
        
        # Generate weekly data points for better performance with long date range
        dates = []
        current_date = start_date
        while current_date <= end_date:
            dates.append(current_date.strftime('%Y-%m-%d'))
            current_date += datetime.timedelta(days=7)  # Weekly sampling
        
        datasets = []
        for platform in platforms:
            if platform in self.platforms:
                # Generate realistic engagement data with some trends
                base_engagement = random.randint(100, 500)
                data_points = []
                
                for i, date in enumerate(dates):
                    # Add some trend and randomness
                    trend = i * random.uniform(0.5, 2.0)
                    daily_variation = random.uniform(0.7, 1.3)
                    weekend_factor = 0.8 if datetime.datetime.strptime(date, '%Y-%m-%d').weekday() >= 5 else 1.0
                    
                    value = int((base_engagement + trend) * daily_variation * weekend_factor)
                    data_points.append(value)
                
                datasets.append({
                    'label': self.platforms[platform]['name'],
                    'data': data_points,
                    'borderColor': self.platforms[platform]['color'],
                    'backgroundColor': self.platforms[platform]['color'] + '20',
                    'tension': 0.4
                })
        
        return {
            'labels': dates,
            'datasets': datasets
        }
    
    def get_follower_growth(self, platforms: List[str], days: int) -> Dict[str, Any]:
        """Generate follower growth data"""
        # Use specific date range: Jan 2022 - Feb 12, 2023
        start_date = datetime.datetime(2022, 1, 1)
        end_date = datetime.datetime(2023, 2, 12)
        
        dates = []
        current_date = start_date
        while current_date <= end_date:
            dates.append(current_date.strftime('%Y-%m-%d'))
            current_date += datetime.timedelta(days=7)  # Weekly sampling
        
        datasets = []
        for platform in platforms:
            if platform in self.platforms:
                base_followers = self.base_followers[platform]
                data_points = []
                
                for i, date in enumerate(dates):
                    # Gradual growth with some daily variations
                    growth_rate = random.uniform(0.001, 0.005)  # 0.1% to 0.5% daily growth
                    daily_growth = int(base_followers * growth_rate)
                    base_followers += daily_growth + random.randint(-5, 15)
                    data_points.append(base_followers)
                
                datasets.append({
                    'label': self.platforms[platform]['name'],
                    'data': data_points,
                    'borderColor': self.platforms[platform]['color'],
                    'backgroundColor': self.platforms[platform]['color'] + '20',
                    'tension': 0.4
                })
        
        return {
            'labels': dates,
            'datasets': datasets
        }
    
    def get_post_performance(self, platforms: List[str], days: int) -> Dict[str, Any]:
        """Generate post performance data"""
        posts_data = []
        
        # Use specific date range: Jan 2022 - Feb 12, 2023
        start_date = datetime.datetime(2022, 1, 1)
        end_date = datetime.datetime(2023, 2, 12)
        total_days = (end_date - start_date).days + 1
        
        for i in range(min(20, total_days)):  # Show last 20 posts or days worth
            post_date = start_date + datetime.timedelta(days=i)
            platform = random.choice(platforms)
            
            if platform in self.platforms:
                # Generate realistic post metrics
                likes = random.randint(50, 2000)
                comments = random.randint(5, 200)
                shares = random.randint(0, 100)
                reach = random.randint(likes, likes * 10)
                
                posts_data.append({
                    'date': post_date.strftime('%Y-%m-%d'),
                    'platform': self.platforms[platform]['name'],
                    'platform_color': self.platforms[platform]['color'],
                    'content': f"Sample post content from {post_date.strftime('%B %d')}",
                    'likes': likes,
                    'comments': comments,
                    'shares': shares,
                    'reach': reach,
                    'engagement_rate': round(((likes + comments + shares) / reach) * 100, 1)
                })
        
        return {
            'posts': sorted(posts_data, key=lambda x: x['date'], reverse=True)
        }
    
    def get_sentiment_data(self, platforms: List[str], days: int) -> Dict[str, Any]:
        """Generate sentiment analysis data"""
        # Overall sentiment distribution
        positive = random.randint(40, 70)
        negative = random.randint(5, 20)
        neutral = 100 - positive - negative
        
        sentiment_data = {
            'overall': {
                'positive': positive,
                'neutral': neutral,
                'negative': negative
            },
            'platforms': {}
        }
        
        # Platform-specific sentiment
        for platform in platforms:
            if platform in self.platforms:
                pos = random.randint(35, 75)
                neg = random.randint(5, 25)
                neu = 100 - pos - neg
                
                sentiment_data['platforms'][platform] = {
                    'name': self.platforms[platform]['name'],
                    'color': self.platforms[platform]['color'],
                    'positive': pos,
                    'neutral': neu,
                    'negative': neg
                }
        
        # Sentiment trend over time
        # Use specific date range: Jan 2022 - Feb 12, 2023
        start_date = datetime.datetime(2022, 1, 1)
        end_date = datetime.datetime(2023, 2, 12)
        
        dates = []
        sentiment_scores = []
        current_date = start_date
        
        while current_date <= end_date:
            dates.append(current_date.strftime('%Y-%m-%d'))
            # Generate sentiment score between 0 and 1
            score = random.uniform(0.3, 0.9)
            sentiment_scores.append(round(score, 2))
            current_date += datetime.timedelta(days=7)  # Weekly sampling
        
        sentiment_data['trend'] = {
            'labels': dates,
            'scores': sentiment_scores
        }
        
        return sentiment_data
    
    def get_realtime_data(self, platforms: List[str]) -> Dict[str, Any]:
        """Generate real-time metrics"""
        realtime_data = {
            'active_users': random.randint(50, 500),
            'new_followers': random.randint(0, 25),
            'recent_posts': random.randint(0, 10),
            'engagement_rate': round(random.uniform(1.5, 8.0), 1),
            'platform_activity': {}
        }
        
        for platform in platforms:
            if platform in self.platforms:
                realtime_data['platform_activity'][platform] = {
                    'name': self.platforms[platform]['name'],
                    'color': self.platforms[platform]['color'],
                    'active_users': random.randint(10, 150),
                    'new_interactions': random.randint(0, 50)
                }
        
        return realtime_data
