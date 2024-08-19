import _ from 'lodash'
const mtproto = require('../modules/telegram/tg');

function calculate_topic_score(view_count: number, mention_count: number, engagement: number) {
    const view_weight = 0.4
    const mention_weight = 0.3
    const engagement_weight = 0.3
    const score = (view_weight * view_count) + (mention_weight * mention_count) + (engagement_weight * engagement)
    return score
}

export async function analyze_theme(theme_name: String) {
    console.log('TEST-1->', theme_name);
    const themeSearhData = await mtproto.mtproto.call('messages.searchGlobal',
        {
            q: theme_name,
            broadcasts_only: true,
            limit: 25
        }
    )
    console.log("GLOBAL-->", themeSearhData);
    return themeSearhData
}

export function analyze_topics(channel_data: any, topics: any) {
    let topic_scores = {}
    
    for (let topic in topics) {
        let view_count = 0
        let mention_count = 0
        let engagement = 0
        
        // for (let post in channel_data) {
        //     if (post.includes(topic)) {
        //         view_count += Number(post.views || 0)
        //         mention_count += 1
        //         engagement += post['likes'] + post['comments'] + post['shares']
        //     }
        //     topic_scores[topic] = calculate_topic_score(view_count, mention_count, engagement)
        // }
    }
    
    return topic_scores
}
