import { hopeTheme } from 'vuepress-theme-hope';

import navbar from './navbar.js';
import sidebar from './sidebar.js';

export default hopeTheme({
	hostname: 'https://vuepress-theme-hope-docs-demo.netlify.app',

	author: {
		name: '江户川柯南',
		url: 'https://mister-hope.com',
	},

	iconAssets: 'fontawesome-with-brands',

	logo: '/site_logo.svg',

	repo: 'http://github.com/tokyokk',

	docsDir: 'src',

	// 导航栏
	navbar,

	// 侧边栏
	sidebar,

	// 页脚
	footer: '默认页脚',
	displayFooter: true,

	// 此处开启了很多功能用于演示，你应仅保留用到的功能。
	markdown: {
		align: true,
		attrs: true,
		codeTabs: true,
		component: true,
		demo: true,
		figure: true,
		gfm: true,
		imgLazyload: true,
		imgSize: true,
		include: true,
		mark: true,
		plantuml: true,
		spoiler: true,
		stylize: [
			{
				matcher: 'Recommended',
				replacer: ({ tag }) => {
					if (tag === 'em')
						return {
							tag: 'Badge',
							attrs: { type: 'tip' },
							content: 'Recommended',
						};
				},
			},
		],
		sub: true,
		sup: true,
		tabs: true,
		tasklist: true,
		vPre: true,
	},

	// rtl: true, // RTL 布局

	// 导航栏布局
	navbarLayout: {
		start: ['Brand'],
		center: ['Links'],
		end: ['Language', 'Repo', 'Outlook', 'Search'],
	},

	// 主题色配置
	themeColor: true, // 直接启用主题色，使用默认配置
	// 导航栏主题色配置
	navbarAutoHide: 'mobile',
	// 路径导航
	breadcrumb: true,

	// 路径导航的图标显示
	breadcrumbIcon: true,
	// 暗黑模式切换-在深色模式和浅色模式中切换
	darkmode: 'switch',
	// 全屏按钮
	fullscreen: true,

	// 博客配置
	blog: {
		// 头像
		avatar: '/head_logo.png',
		// 名称
		name: 'tokyokk',
		// // 是否是圆形头像
		// roundAvatar: false,
		// 个人描述
		description: 'Stay hungry，Stay foolish',
		// 社交媒体
		medias: {
			Gitee: 'https://gitee.com/bugstacks',
			GitHub: 'https://github.com/tokyokk',
			Zhihu: 'https://www.zhihu.com/people/52-36-12-20',
		},
		// 博客的侧边栏设置
		sidebarDisplay: 'mobile',
		// 每页展示的文章数量
		articlePerPage: 7,
		timeline: '江户川柯南の时光轴🍃',
	},

	// 在这里配置主题提供的插件
	plugins: {
		components: {
			components: ['Badge', 'VPCard'],
		},
		// 打开博客功能
		blog: {},
		search: false,
		// 添加自动目录配置
		catalog: {
			index: true,
		},
	},
});
