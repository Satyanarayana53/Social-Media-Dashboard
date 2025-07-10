class SocialAnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.autoRefreshInterval = null;
        this.autoRefreshEnabled = true;
        this.currentFilters = {
            platforms: ['twitter', 'instagram', 'facebook', 'linkedin'],
            dateRange: '30'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.setupAutoRefresh();
    }
    
    setupEventListeners() {
        // Platform filter checkboxes
        const platformFilters = document.querySelectorAll('.platform-filter');
        platformFilters.forEach(filter => {
            filter.addEventListener('change', () => {
                this.updateFilters();
                this.refreshAllData();
            });
        });
        
        // Date range selector
        const dateRangeSelect = document.getElementById('dateRange');
        dateRangeSelect.addEventListener('change', () => {
            this.updateFilters();
            this.refreshAllData();
        });
        
        // Auto refresh toggle
        const autoRefreshToggle = document.getElementById('autoRefresh');
        autoRefreshToggle.addEventListener('change', (e) => {
            this.autoRefreshEnabled = e.target.checked;
            if (this.autoRefreshEnabled) {
                this.setupAutoRefresh();
            } else {
                this.clearAutoRefresh();
            }
        });
    }
    
    updateFilters() {
        // Get selected platforms
        const selectedPlatforms = [];
        const platformFilters = document.querySelectorAll('.platform-filter:checked');
        platformFilters.forEach(filter => {
            selectedPlatforms.push(filter.value);
        });
        
        // Get selected date range
        const dateRange = document.getElementById('dateRange').value;
        
        this.currentFilters = {
            platforms: selectedPlatforms,
            dateRange: dateRange
        };
    }
    
    async loadInitialData() {
        try {
            await Promise.all([
                this.loadOverviewData(),
                this.loadEngagementData(),
                this.loadFollowerData(),
                this.loadPostData(),
                this.loadSentimentData()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showError('Failed to load dashboard data');
        }
    }
    
    async refreshAllData() {
        try {
            // Add updating animation
            document.body.classList.add('updating');
            
            await this.loadInitialData();
            
            // Remove updating animation
            setTimeout(() => {
                document.body.classList.remove('updating');
            }, 500);
        } catch (error) {
            console.error('Error refreshing data:', error);
            this.showError('Failed to refresh data');
        }
    }
    
    async loadOverviewData() {
        try {
            const params = new URLSearchParams();
            this.currentFilters.platforms.forEach(platform => {
                params.append('platforms', platform);
            });
            params.append('date_range', this.currentFilters.dateRange);
            
            const response = await fetch(`/api/overview?${params}`);
            if (!response.ok) throw new Error('Failed to fetch overview data');
            
            const data = await response.json();
            this.updateOverviewCards(data);
        } catch (error) {
            console.error('Error loading overview data:', error);
            this.showError('Failed to load overview statistics');
        }
    }
    
    async loadEngagementData() {
        try {
            const params = new URLSearchParams();
            this.currentFilters.platforms.forEach(platform => {
                params.append('platforms', platform);
            });
            params.append('date_range', this.currentFilters.dateRange);
            
            const response = await fetch(`/api/engagement?${params}`);
            if (!response.ok) throw new Error('Failed to fetch engagement data');
            
            const data = await response.json();
            this.updateEngagementChart(data);
        } catch (error) {
            console.error('Error loading engagement data:', error);
            this.showError('Failed to load engagement chart');
        }
    }
    
    async loadFollowerData() {
        try {
            const params = new URLSearchParams();
            this.currentFilters.platforms.forEach(platform => {
                params.append('platforms', platform);
            });
            params.append('date_range', this.currentFilters.dateRange);
            
            const response = await fetch(`/api/followers?${params}`);
            if (!response.ok) throw new Error('Failed to fetch follower data');
            
            const data = await response.json();
            this.updateFollowerChart(data);
            this.updatePlatformChart(data);
        } catch (error) {
            console.error('Error loading follower data:', error);
            this.showError('Failed to load follower chart');
        }
    }
    
    async loadPostData() {
        try {
            const params = new URLSearchParams();
            this.currentFilters.platforms.forEach(platform => {
                params.append('platforms', platform);
            });
            params.append('date_range', this.currentFilters.dateRange);
            
            const response = await fetch(`/api/posts?${params}`);
            if (!response.ok) throw new Error('Failed to fetch post data');
            
            const data = await response.json();
            this.updatePostsTable(data);
        } catch (error) {
            console.error('Error loading post data:', error);
            this.showError('Failed to load post performance data');
        }
    }
    
    async loadSentimentData() {
        try {
            const params = new URLSearchParams();
            this.currentFilters.platforms.forEach(platform => {
                params.append('platforms', platform);
            });
            params.append('date_range', this.currentFilters.dateRange);
            
            const response = await fetch(`/api/sentiment?${params}`);
            if (!response.ok) throw new Error('Failed to fetch sentiment data');
            
            const data = await response.json();
            this.updateSentimentChart(data);
        } catch (error) {
            console.error('Error loading sentiment data:', error);
            this.showError('Failed to load sentiment analysis');
        }
    }
    
    updateOverviewCards(data) {
        document.getElementById('totalFollowers').textContent = data.total_followers.toLocaleString();
        document.getElementById('followerGrowth').textContent = data.follower_growth;
        document.getElementById('totalEngagement').textContent = data.total_engagement.toLocaleString();
        document.getElementById('engagementRate').textContent = data.engagement_rate;
        document.getElementById('totalPosts').textContent = data.total_posts;
        document.getElementById('avgSentiment').textContent = data.avg_sentiment;
    }
    
    updateEngagementChart(data) {
        const ctx = document.getElementById('engagementChart').getContext('2d');
        
        if (this.charts.engagement) {
            this.charts.engagement.destroy();
        }
        
        this.charts.engagement = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Engagement'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }
    
    updateFollowerChart(data) {
        const ctx = document.getElementById('followerChart').getContext('2d');
        
        if (this.charts.follower) {
            this.charts.follower.destroy();
        }
        
        this.charts.follower = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Followers'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }
    
    updatePlatformChart(data) {
        const ctx = document.getElementById('platformChart').getContext('2d');
        
        if (this.charts.platform) {
            this.charts.platform.destroy();
        }
        
        // Create a bar chart showing current follower counts
        const labels = data.datasets.map(dataset => dataset.label);
        const values = data.datasets.map(dataset => dataset.data[dataset.data.length - 1]);
        const colors = data.datasets.map(dataset => dataset.borderColor);
        
        this.charts.platform = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Current Followers',
                    data: values,
                    backgroundColor: colors.map(color => color + '80'),
                    borderColor: colors,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Followers'
                        }
                    }
                }
            }
        });
    }
    
    updateSentimentChart(data) {
        const ctx = document.getElementById('sentimentChart').getContext('2d');
        
        if (this.charts.sentiment) {
            this.charts.sentiment.destroy();
        }
        
        this.charts.sentiment = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [data.overall.positive, data.overall.neutral, data.overall.negative],
                    backgroundColor: [
                        '#198754',
                        '#6c757d',
                        '#dc3545'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
    
    updatePostsTable(data) {
        const tableBody = document.getElementById('postsTable');
        
        if (!data.posts || data.posts.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted">
                        <i class="fas fa-inbox fa-2x mb-2"></i>
                        <p>No posts found for the selected criteria</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        tableBody.innerHTML = data.posts.map(post => `
            <tr>
                <td>${new Date(post.date).toLocaleDateString()}</td>
                <td>
                    <span class="platform-badge ${post.platform.toLowerCase()}" style="background-color: ${post.platform_color}">
                        ${post.platform}
                    </span>
                </td>
                <td>${post.content}</td>
                <td>${post.likes.toLocaleString()}</td>
                <td>${post.comments.toLocaleString()}</td>
                <td>${post.shares.toLocaleString()}</td>
                <td>${post.reach.toLocaleString()}</td>
                <td>
                    <span class="badge ${post.engagement_rate > 5 ? 'bg-success' : post.engagement_rate > 2 ? 'bg-warning' : 'bg-secondary'}">
                        ${post.engagement_rate}%
                    </span>
                </td>
            </tr>
        `).join('');
    }
    
    setupAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
        
        if (this.autoRefreshEnabled) {
            this.autoRefreshInterval = setInterval(() => {
                this.refreshAllData();
            }, 30000); 
        }
    }
    
    clearAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }
    
    showError(message) {
        // Create a toast notification for errors
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-danger border-0';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        // Add to page
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '1055';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.appendChild(toast);
        
        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove from DOM after hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialAnalyticsDashboard();
});

// Handle window resize for chart responsiveness
window.addEventListener('resize', () => {
    Chart.helpers.each(Chart.instances, (instance) => {
        instance.resize();
    });
});
