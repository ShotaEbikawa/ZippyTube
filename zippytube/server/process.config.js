module.exports = {
    apps: [
        {
            name: 'gateway',
            script: './gateway.js',
            ignore_watch: ["../node_modules"],
            watch: true,
        },
        {
            name: 'user-server',
            script: './user-server.js',
            ignore_watch: ["../node_modules"],
            watch: true,
        },
        {
            name: 'presentation',
            script: './fileServer.js',
            ignore_watch: ["../node_modules"],
            watch: true,
        },
/*         {
            name: 'media-server',
            script: './media.js',
            ignore_watch: ["../node_modules"],
            watch: true,
        } */
    ]
}