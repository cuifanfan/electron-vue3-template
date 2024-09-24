export default [
    {
        cnName: 'Github',
        enName: 'Github',
        path: '/helloGithub', //无效path用于，显示判断菜单切换是否为二级路由
        subMenu: [
            {
                cnName: '前端',
                enName: 'frontEnd',
                path: '/helloGithub/frontEnd',
                subMenu: []
            },
            {
                cnName: '后端',
                enName: 'backEnd',
                path: '/helloGithub/backEnd',
                subMenu: []
            },
            {
                cnName: '测开',
                enName: 'testDevelop',
                path: '/helloGithub/testDevelop',
                subMenu: []
            }
        ]
    },
    {
        cnName: '你好',
        enName: 'helloWorld',
        path: '/helloWorld',
        subMenu: []
    },
    {
        cnName: '退出',
        enName: 'Quit',
        path: '/quit',
        subMenu: []
    }
];
