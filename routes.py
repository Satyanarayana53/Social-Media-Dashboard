from flask import render_template, jsonify, request
from app import app
from data_generator import DataGenerator
import logging

# Initialize data generator
data_gen = DataGenerator()

@app.route('/')
def dashboard():
    """Main dashboard page"""
    return render_template('dashboard.html')

@app.route('/api/overview')
def api_overview():
    """Get overview statistics"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        date_range = request.args.get('date_range', '30')
        
        data = data_gen.get_overview_stats(platforms, int(date_range))
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_overview: {str(e)}")
        return jsonify({'error': 'Failed to fetch overview data'}), 500

@app.route('/api/engagement')
def api_engagement():
    """Get engagement metrics"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        date_range = request.args.get('date_range', '30')
        
        data = data_gen.get_engagement_data(platforms, int(date_range))
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_engagement: {str(e)}")
        return jsonify({'error': 'Failed to fetch engagement data'}), 500

@app.route('/api/followers')
def api_followers():
    """Get follower growth data"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        date_range = request.args.get('date_range', '30')
        
        data = data_gen.get_follower_growth(platforms, int(date_range))
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_followers: {str(e)}")
        return jsonify({'error': 'Failed to fetch follower data'}), 500

@app.route('/api/posts')
def api_posts():
    """Get post performance data"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        date_range = request.args.get('date_range', '30')
        
        data = data_gen.get_post_performance(platforms, int(date_range))
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_posts: {str(e)}")
        return jsonify({'error': 'Failed to fetch post data'}), 500

@app.route('/api/sentiment')
def api_sentiment():
    """Get sentiment analysis data"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        date_range = request.args.get('date_range', '30')
        
        data = data_gen.get_sentiment_data(platforms, int(date_range))
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_sentiment: {str(e)}")
        return jsonify({'error': 'Failed to fetch sentiment data'}), 500

@app.route('/api/realtime')
def api_realtime():
    """Get real-time metrics"""
    try:
        platforms = request.args.getlist('platforms') or ['twitter', 'instagram', 'facebook', 'linkedin']
        
        data = data_gen.get_realtime_data(platforms)
        return jsonify(data)
    except Exception as e:
        logging.error(f"Error in api_realtime: {str(e)}")
        return jsonify({'error': 'Failed to fetch real-time data'}), 500
