const URL = {
    GET_INFO: '/navigation'
}

const navigationList = [
    [
        {
            muneName: '首页',
            menuUrl: '/home',
            pathName: 'home',
            componentPath: 'components/Home',
            menuFather: 0,
            menuId: 1,
            keyName: 'index',
            haveChild: false
        }
    ],
    [
        {
            muneName: '系统管理',
            menuUrl: null,
            pathName: null,
            componentPath: null,
            menuFather: 0,
            menuId: 2,
            keyName: 'system',
            haveChild: true,
            childList: [
                {
                    muneName: '用户管理',
                    menuUrl: '/system',
                    pathName: 'system',
                    componentPath: '/system',
                    menuFather: 1,
                    menuId: 3,
                    keyName: 'system',
                    haveChild: false
                },
                {
                    muneName: '部门管理',
                    menuUrl: '/system',
                    pathName: 'system',
                    componentPath: '/system',
                    menuFather: 1,
                    menuId: 3,
                    keyName: 'system',
                    haveChild: false
                }
            ]
        },
    ],
]



export default {
    getInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(navigationList)
            }, 1000)
        })
    }

}