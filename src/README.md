---
home: true
icon: home
title: 项目主页
heroImage: /site_logo.svg
# bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
# bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
    background-attachment: fixed
heroText: bugstackの进阶之路
tagline: 「Java学习 + 面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。
# tagline: A ship in harbor is safe, but that is not what ships are built for.
actions:
    - text: 快速上手
      icon: lightbulb
      link: ./notes/
      type: primary

    - text: 前端教程
      icon: umbrella-beach
      link: ./web/
      type: primary

    - text: 微服务教程
      icon: fire
      link: ./springcloud/
      type: primary

    - text: 博客主页
      icon: blog
      link: ./blog/
      type: primary

features:
    - title: mall学习教程
      icon: markdown
      details: mall学习教程，架构、业务、技术要点全方位解析。mall项目（50k+star）是一套电商系统，使用现阶段主流技术实现。
      link: /mall/foreword/mall_foreword_01

    - title: SpringCloud学习教程
      icon: slides
      details: 一套涵盖大部分核心组件使用的Spring Cloud教程，包括Spring Cloud Alibaba及分布式事务Seata，基于Spring Cloud Greenwich及SpringBoot 2.1.7。
      link: /springcloud/springcloud

    - title: K8S系列教程
      icon: layout
      details: 实实在在的K8S实战教程，专为Java方向人群打造！只讲实用的，抛弃那些用不到又难懂的玩意！同时还有配套的微服务实战项目mall-swarm，很好很强大！
      link: https://juejin.cn/column/6962026171823292452

    - title: mall
      icon: markdown
      details: mall项目是一套电商系统，包括前台商城系统及后台管理系统，基于SpringBoot+MyBatis实现，采用Docker容器化部署。
      link: https://github.com/macrozheng/mall

    - title: mall-admin-web
      icon: comment
      details: mall-admin-web是一个电商后台管理系统的前端项目，基于Vue+Element实现。
      link: https://github.com/macrozheng/mall-admin-web

    - title: mall-swarm
      icon: info
      details: mall-swarm是一套微服务商城系统，采用了 Spring Cloud Hoxton & Alibaba、Spring Boot 2.3、Docker、Kubernetes等核心技术。
      link: https://github.com/macrozheng/mall-swarm

    - title: mall-tiny
      icon: blog
      details: mall-tiny是一款基于SpringBoot+MyBatis-Plus的快速开发脚手架，拥有完整的权限管理功能，可对接Vue前端，开箱即用。
      link: https://github.com/macrozheng/mall-tiny
---

### A ship in harbor is safe, but that is not what ships are built for.

想要使用此布局，你需要在页面 front matter 中设置 `home: true`。

配置项的相关说明详见 [项目主页配置](https://theme-hope.vuejs.press/zh/guide/layout/home/)。
