export default [
	//首页
  {
		path: '/',
		name: 'home',
		component: () => import('../../views/home/home.vue'),
	},
	//分类页面
	{
		path: '/categories',
		name: 'categories',
		component: () => import('../../views/categories/categories.vue'),
	},
	//产品列表
	{
		path: '/product-list',
		name: 'product-list',
		component: () => import('../../views/product-list/product-list.vue'),
	},
	//产品详情
	{
		path: '/product-info',
		name: 'product-info',
		component: () => import('../../views/product-info/product-info.vue'),
	},
	//写评论
	{
		path: '/write-review',
		name: 'write-review',
		component: () => import('../../views/write-review/write-review.vue'),
	},
	//比较
	{
		path: '/compare',
		name: 'compare',
		component: () => import('../../views/compare/compare.vue'),
	},
	//跳转页
	{
		path: '/check-page',
		name: 'check-page',
		component: () => import('../../views/check-page/check-page.vue'),
	},
]