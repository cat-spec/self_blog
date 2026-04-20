/*
 Navicat Premium Data Transfer

 Source Server         : demo1
 Source Server Type    : MySQL
 Source Server Version : 80045 (8.0.45)
 Source Host           : localhost:3306
 Source Schema         : self_blog

 Target Server Type    : MySQL
 Target Server Version : 80045 (8.0.45)
 File Encoding         : 65001

 Date: 18/04/2026 21:52:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_tags
-- ----------------------------
DROP TABLE IF EXISTS `article_tags`;
CREATE TABLE `article_tags`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` int UNSIGNED NOT NULL COMMENT '文章ID',
  `tag_id` int UNSIGNED NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_article_tag`(`article_id` ASC, `tag_id` ASC) USING BTREE,
  INDEX `idx_tag_id`(`tag_id` ASC) USING BTREE,
  CONSTRAINT `fk_article_tags_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_article_tags_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章与标签关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_tags
-- ----------------------------

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题/名字',
  `file_path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '服务器存储路径（相对或绝对）',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '简介',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `total_views` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章主表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 'tailwindcss学习', 'http://127.0.0.1:3002/artical/Tailwind学习.md', '简介', '2026-04-18 12:51:19', 0);
INSERT INTO `articles` VALUES (8, 'Mysql学习', 'http://localhost:3002/artical/1776519763375-547540177.md', '个人mysql复习资料', '2026-04-18 21:42:43', 0);

-- ----------------------------
-- Table structure for platform_stats
-- ----------------------------
DROP TABLE IF EXISTS `platform_stats`;
CREATE TABLE `platform_stats`  (
  `p_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `platform_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '平台名称，如：知乎、微信公众号、CSDN等',
  `user_info` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '个人在该平台的信息，如昵称、账号或主页ID',
  `works_count` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '作品数量',
  `fen` int NULL DEFAULT NULL,
  `total_views` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '总阅读量',
  `total_collections` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章收藏数量',
  PRIMARY KEY (`p_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of platform_stats
-- ----------------------------
INSERT INTO `platform_stats` VALUES (1, 'csdn', '菠萝', 2, 1, 615, 12);
INSERT INTO `platform_stats` VALUES (2, 'juejin', '菠萝', 2, 0, 95, 1);

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称，如 \"vue\"',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (3, 'Node');
INSERT INTO `tags` VALUES (2, 'TypeScript');
INSERT INTO `tags` VALUES (1, 'Vue');

SET FOREIGN_KEY_CHECKS = 1;
