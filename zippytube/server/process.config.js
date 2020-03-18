module.exports = {
    apps: [
        {
            name: 'gateway',
            script: './gateway.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'user-server',
            script: './endPoints/userServer.js',
            ignore_watch: ["../node_modules", "./uploads"],
            watch: true,
        },        
        {
            name: 'redis-server',
            script: './endPoints/redisServer.js',
            ignore_watch: ["../node_modules", "./uploads"],
            watch: true,
        },

        {
            name: 'presentation',
            script: './endPoints/fileServer.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'media-server-write',
            script: './endPoints/mediaWrite.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'comment-server',
            script: './endPoints/commentServer.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'media-server-read',
            script: './endPoints/mediaRead.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'feed-server',
            script: './endPoints/feedServer.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'profile-server',
            script: './endPoints/profileServer.js',
            ignore_watch: ["../node_modules", "./uploads"],
            watch: true,
        }, 
    ]
}