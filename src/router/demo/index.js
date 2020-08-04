import Index from '../../Layout/index.vue'
import Child from '../../pages/Index/child.vue'
import Childtwo from '../../pages/Index/child2.vue'
import Childthree from '../../pages/Index/child3.vue'
import error from '../../pages/404/index.vue'

import {
  commodity
} from "./commodity";

const Childfour = {
  template: '<div style="background-color:#de5b5b;color:#fff; font-size:30px;line-height:100px;text-align:center;">red页面</div>'
}
const yellow = {
  template: '<div style="background-color:#dee066;color:#fff; font-size:30px;line-height:100px;text-align:center;">yellow页面</div>'
}
const blue = {
  template: '<div style="background-color:#6680e0;color:#fff; font-size:30px;line-height:100px;text-align:center;">blue页面</div>'
}

export const powerRouter = [{
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/index/black',
    children: [{
      path: '/index/black',
      name: '首页',
      component: () => import('../../pages/shouye/index.vue'),
      meta: {
        title: '首页'
      }
    }]
  },
  {
    path: '/index',
    name: '2',
    component: Index,
    meta: {
      role: ['B']
    },
    children: [{
        path: '/index/child',
        name: 'child',
        component: Child,
        meta: {
          role: ['B']
        },
        children: [{
            path: '/index/child/childthree',
            name: 'child3',
            component: Childthree,
            meta: {
              role: ['B']
            },
            children: [{
                path: '/index/child/childthree/child',
                name: 'child4',
                component: Childfour,
                meta: {
                  role: ['B']
                },

              },
              {
                path: '/index/child/childthree/yellow',
                name: 'yellow',
                component: yellow,
                // hidden:true,
                meta: {
                  role: ['B'],

                },

              },

            ]
          },
          {
            path: '/index/child/blue',
            name: 'blue',
            component: blue,
            meta: {
              role: ['B']
            },

          },
          {
            path: '/index/childtwo',
            name: 'child2',
            component: Childtwo,
            meta: {
              role: ['B']
            },
          }
        ]
      },

    ]
  },
  {
    path: "/index",
    component: Index,
    name: "Info",
    meta: {
      role: ['C']
    },
    children: [{

      path: "/Info/index",
      name: 'Form',
      component: () => import('../../pages/Info/index.vue'),
      meta: {
        role: ['C']
      },
    }]

  },
  ...commodity,
  {
    path: "/index",
    component: Index,
    name: "Index",
    meta: {
      role: ['C']
    },
    children: [{

      path: "/suk/index",
      name: 'Suk',
      component: () => import('../../pages/suk/index.vue')
    }] 
  }

]

export const relaxRouter = [{
    path: '/404',
    name: '404',
    component: error,


  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404",
  }
]
