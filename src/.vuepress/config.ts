import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { searchProPlugin } from 'vuepress-plugin-search-pro';

export default defineUserConfig({
	base: '/',

	lang: 'zh-CN',
	title: 'bugstackの进阶之路',
	description: 'A ship in harbor is safe, but that is not what ships are built for.',
	// 设置favicon
	head: [['link', { rel: 'icon', href: '/site_logo.svg' }]],
	theme,

	// 和 PWA 一起启用
	// shouldPrefetch: false,

	plugins: [
		searchProPlugin({
			// 索引全部内容
			indexContent: true,
			// 为分类和标签添加索引
			customFields: [
				{
					getter: page => page.frontmatter.category as any,
					formatter: '分类：$content',
				},
				{
					getter: page => page.frontmatter.tag as any,
					formatter: '标签：$content',
				},
			],
		}),
	],
});
