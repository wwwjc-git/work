
import Index from '../../Layout/index.vue'

const obj={
      template:" <div><keep-alive><router-view></router-view></keep-alive></div>"
}
export  const commodity=[
    {
    path: '/index',
    name: '1',
    component: Index,
    children: [{
      path: '/index/Commoditymanage',
      component: obj,
      name: '商品',
      meta:{
        title:'商品',
        role: ['B']
      },
      children:[
          {
            path: '/index/Commoditymanage',
            name: '商品管理',
            component: () => import('../../pages/Commodity/manage/index.vue'),
            meta:{
              title:'商品管理',
              role: ['B']
            }, 
          },
          {
            path: '/index/Commoditycommodity',
            name: '商品测试',
            component: () => import('../../pages/Commodity/commodity/index.vue'),
            meta:{
              title:'商品测试',
              role: ['B']
            }, 
          }
      ]
    }]
    
    },
    {
      path: '/index',
    name: '1',
    component: Index,
    children: [{
      path: '/index/demo',
      component: ()=>import('../../pages/demo.vue'),
      name: '转盘',
      meta:{
        title:'转盘',
        role: ['B']
      },
    }
    ]
  }
]