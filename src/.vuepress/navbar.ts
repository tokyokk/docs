import { navbar } from 'vuepress-theme-hope';

export default navbar([
	'/',
	{ text: '博客主页', icon: 'blog', link: '/blog/' },
	'/portfolio',
	{ text: 'Java学习教程', icon: '/assets/icon/java.png', link: '/notes/' },
	{ text: 'web学习教程', icon: '/assets/icon/web.png', link: '/web/' },
	{
		text: 'SpringCloud学习教程',
		icon: 'cloud',
		prefix: '/springcloud/',
		children: [
			{
				text: 'SpringCloud Alibaba 系列教程',
				icon: '/assets/icon/xb.png',
				link: 'alibaba/一、微服务架构零基础理论入门.md',
			},
			{
				text: 'SpringCloud NetFlix 系列教程',
				icon: '/assets/icon/fy.png',
				link: 'netflix/SpringCloud Netflix.md',
			},
		],
	},
	{ text: '分布式微服务架构', icon: '/assets/icon/xb.png', link: '/distributed/zk/' },
	{ text: '工具与部署', icon: 'cloud', link: '/devops/' },
]);
