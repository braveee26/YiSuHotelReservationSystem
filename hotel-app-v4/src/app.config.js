export default {
  pages: [
    'pages/auth/login/index',
    'pages/home/index',
    'pages/user/index',
    'pages/order/index',
    'pages/auth/register/index',
  ],
  subPackages: [
    {
      root: 'pages/hotel',
      pages: [
        'list/index',
        'detail/index',
        'booking/index'
      ]
    },
    {
      root: 'pages/sub-main',
      pages: [
        'favorites/index',
        'messages/index',
        'reviews/index'
      ]
    },
    {
      root: 'pages/sub-user',
      pages: [
        'contacts/index',
        'settings/index'
      ]
    }
  ],
  /* Custom TabBar Implementation - Disabling native config
  tabBar: {
    custom: false,
    color: '#999',
    selectedColor: '#fa2c19',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: '/assets/tab-home.png',
        selectedIconPath: '/assets/tab-home-active.png'
      },
      {
        pagePath: 'pages/order/index',
        text: '订单',
        iconPath: '/assets/tab-order.png',
        selectedIconPath: '/assets/tab-order-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: '/assets/tab-user.png',
        selectedIconPath: '/assets/tab-user-active.png'
      }
    ]
  },
  */
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Hotel App',
    navigationBarTextStyle: 'black'
  }
}
