module.exports = {
    apps: [
        {
            name: "my-blog",
            cwd: './',
            script: "npm",
            args: "start",
            watch: true,
            autorestart: true,
            ignore_watch: ["node_modules"],
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
