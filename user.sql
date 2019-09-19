-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-09-19 13:57:31
-- 服务器版本： 10.3.16-MariaDB
-- PHP 版本： 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `footprint`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `uid` int(10) NOT NULL COMMENT '用户id',
  `unum` char(30) NOT NULL COMMENT '用户账号，用于登陆账号',
  `uname` char(30) NOT NULL COMMENT '用户名，用于网页显示',
  `upwd` char(50) NOT NULL COMMENT '用户密码',
  `uphone` char(11) DEFAULT NULL COMMENT '用户电话号码',
  `uEmail` char(30) DEFAULT NULL COMMENT '用户Email',
  `urole` int(3) DEFAULT 0 COMMENT '用户角色',
  `uscore` int(50) DEFAULT 0 COMMENT '用户积分'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `unum`, `uname`, `upwd`, `uphone`, `uEmail`, `urole`, `uscore`) VALUES
(1, 'zxm', '朱雪梅', 'zxm123', NULL, NULL, 1, NULL),
(2, 'sfq', '孙复棋', 'sfq123', NULL, NULL, 1, NULL),
(3, 'lww', '陆伟伟', 'lww123', NULL, NULL, 1, NULL),
(4, 'sxp', '苏晓鹏', 'sxp123', NULL, NULL, 1, NULL),
(5, 'dingding', '钉钉', 'dd123', '13567825627', '1369866743@163.com', 0, 120),
(6, 'ss', 'peng', '', NULL, NULL, 0, 0),
(7, '3', 'peng', '', NULL, NULL, 0, 0),
(9, 'bbv', 'peng', '', NULL, NULL, 0, 0),
(10, '13512345678', '', '', NULL, NULL, 0, 0),
(11, '1212', '1222', 'www111', NULL, NULL, 0, 0),
(12, '32', '1222', 'www111', NULL, NULL, 0, 100),
(13, '45', '1222', 'www111', NULL, '132333Q@qq.com', 0, 100);

--
-- 转储表的索引
--

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
