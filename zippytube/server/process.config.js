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
            script: './user-server.js',
            ignore_watch: ["../node_modules", "./uploads"],
            watch: true,
        },
        {
            name: 'presentation',
            script: './fileServer.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'media-server-write',
            script: './mediaWrite.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name:'consumer',
            script: './pubSub/consumer.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'commentWrite',
            script: './commentWrite.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        },
        {
            name: 'media-server-read',
            script: './mediaRead.js',
            ignore_watch: ["../node_modules","./uploads"],
            watch: true,
        }
    ]
}