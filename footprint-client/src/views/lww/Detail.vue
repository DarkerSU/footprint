<template>
  <!-- 图片展示组件 -->
  <div class="lww-view">
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐" name="first">
        <!-- 栅格布局4*4 -->
        <el-scrollbar>
          <el-row :gutter="20" v-for="(o, index) in 2" :key="index">
            <el-col class="img-mar" :span="6" v-for="(o, index) in 4" :key="index">
              <div class="grid-content bg-purple">
                <el-card :body-style="{ padding: '0px' }">
                  <!-- 首页图片展示 -->
                  <div class="pic-hid">
                    <a href>
                      <img
                        src="../../assets/img/LuWeiWei/adorable-animal-blur-979003.jpg"
                        class="image"
                      />
                    </a>
                  </div>
                  <div style="padding: 14px;">
                    <!-- 点评小图标 -->
                    <div class="icon-container">
                      <a href class="wacth-icon">
                        <el-badge :value="6" class="item"></el-badge>
                      </a>
                      <a href class="comment-icon">
                        <el-badge :value="0" class="item"></el-badge>
                      </a>
                      <a href class="good-icon">
                        <el-badge :value="8" class="item"></el-badge>
                      </a>
                      <a href class="like-icon">
                        <el-badge :value="100" class="item"></el-badge>
                      </a>
                    </div>
                    <!-- 作品名称 -->
                    <div class="pic-name">
                      <span>可爱的小脑斧!!!!!</span>
                    </div>
                    <!-- 卡片底部信息 -->
                    <div class="card-bottom-msg">
                      <!-- 用户名+头像 -->
                      <div class="writer-msg">
                        <span>
                          <a href>
                            <img
                              src="../../assets/img/LuWeiWei/background-beautiful-color-1144686.jpg"
                            />
                            哔哩哔哩哔哔哔
                          </a>
                        </span>
                      </div>
                      <!-- 关联标签 -->
                      <div class="clearfix">
                        <el-tag class="tag-gap">萌宠</el-tag>
                        <el-tag class="tag-gap">动物</el-tag>
                        <el-tag class="tag-gap">喵星人</el-tag>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="最热" name="second">
        <el-row :gutter="20" v-for="(o, index) in 2" :key="index">
          <el-col class="img-mar" :span="6" v-for="(o, index) in 4" :key="index">
            <div class="grid-content bg-purple">
              <el-card :body-style="{ padding: '0px' }">
                <!-- 首页图片展示 -->
                <div class="pic-hid">
                  <a href>
                    <img
                      src="../../assets/img/LuWeiWei/adorable-animal-baby-1851164.jpg"
                      class="image"
                    />
                  </a>
                </div>
                <div style="padding: 14px;">
                  <!-- 点评小图标 -->
                  <div class="icon-container">
                    <a href class="wacth-icon">
                      <el-badge :value="6" class="item"></el-badge>
                    </a>
                    <a href class="comment-icon">
                      <el-badge :value="0" class="item"></el-badge>
                    </a>
                    <a href class="good-icon">
                      <el-badge :value="8" class="item"></el-badge>
                    </a>
                    <a href class="like-icon">
                      <el-badge :value="100" class="item"></el-badge>
                    </a>
                  </div>
                  <!-- 作品名称 -->
                  <div class="pic-name">
                    <span>可爱的小脑斧!!!!!</span>
                  </div>
                  <!-- 卡片底部信息 -->
                  <div class="card-bottom-msg">
                    <!-- 用户名+头像 -->
                    <div class="writer-msg">
                      <span>
                        <a href>
                          <img
                            src="../../assets/img/LuWeiWei/background-beautiful-color-1144686.jpg"
                          />
                          哔哩哔哩哔哔哔
                        </a>
                      </span>
                    </div>
                    <!-- 关联标签 -->
                    <div class="clearfix">
                      <el-tag class="tag-gap">萌宠</el-tag>
                      <el-tag class="tag-gap">动物</el-tag>
                      <el-tag class="tag-gap">喵星人</el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="最新" name="third">
        <el-row :gutter="20" v-for="(o, index) in 2" :key="index">
          <el-col class="img-mar" :span="6" 　v-for="(o, index) in 4" :key="index">
            <div class="grid-content bg-purple">
              <el-card :body-style="{ padding: '0px' }">
                <!-- 首页图片展示 -->
                <div class="pic-hid">
                  <a href>
                    <img
                      src="../../assets/img/LuWeiWei/animal-beef-cattle-calf-1449656.jpg"
                      class="image"
                    />
                  </a>
                </div>
                <div style="padding: 14px;">
                  <!-- 点评小图标 -->
                  <div class="icon-container">
                    <a href class="wacth-icon">
                      <el-badge :value="6" class="item"></el-badge>
                    </a>
                    <a href class="comment-icon">
                      <el-badge :value="0" class="item"></el-badge>
                    </a>
                    <a href class="good-icon">
                      <el-badge :value="8" class="item"></el-badge>
                    </a>
                    <a href class="like-icon">
                      <el-badge :value="100" class="item"></el-badge>
                    </a>
                  </div>
                  <!-- 作品名称 -->
                  <div class="pic-name">
                    <span>可爱的小脑斧!!!!!</span>
                  </div>
                  <!-- 卡片底部信息 -->
                  <div class="card-bottom-msg">
                    <!-- 用户名+头像 -->
                    <div class="writer-msg">
                      <span>
                        <a href>
                          <img
                            src="../../assets/img/LuWeiWei/background-beautiful-color-1144686.jpg"
                          />
                          哔哩哔哩哔哔哔
                        </a>
                      </span>
                    </div>
                    <!-- 关联标签 -->
                    <div class="clearfix">
                      <el-tag class="tag-gap">萌宠</el-tag>
                      <el-tag class="tag-gap">动物</el-tag>
                      <el-tag class="tag-gap">喵星人</el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
.lww-view {
  margin: 60px 60px;
}
a {
  text-decoration: none;
  color: #333333;
}
/* 后加样式 */
.img-mar {
  padding: 10px;
  /*  */
}
.el-card.is-always-shadow:hover {
  box-shadow: 0 0 10px #333;
}
/* 标签页样式 */
.el-tabs.el-tabs--top
  > .el-tabs__header.is-top
  > .el-tabs__nav-wrap.is-top
  > .el-tabs__nav-scroll {
  display: flex;
  /*弹性*/
  justify-content: center;
  /*居中*/
}

.el-tabs.el-tabs--top
  > .el-tabs__header.is-top
  > .el-tabs__nav-wrap.is-top
  > .el-tabs__nav-scroll
  > .el-tabs__nav.is-top
  > .el-tabs__item.is-top {
  font-size: 26px;
  /*字体大小*/
}

/*栅格布局4*4样式*/
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

/* .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  } */

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/*卡片样式*/

.el-card {
  border-radius: 10px !important;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 120%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.pic-hid {
  width: 100%;
  height: 450px;
  overflow: hidden;
}

/*图片过渡效果*/
a > img {
  transition: all 2s;
}

a > img:hover {
  transform: scale(1.3);
}

/* 点评小图标 */
.icon-container {
  display: flex;
  justify-content: space-around;
  margin: 12px 0 15px 0;
}

.icon-container > a {
  margin: 0 10px 0 10px;
  display: inline-block;
  width: 25px;
  height: 25px;
}

/* 浏览记录图标 */
.icon-container .wacth-icon {
  background-image: url("../../assets/img/LuWeiWei/see.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}

/* 浏览记录角标 */
.icon-container .wacth-icon .el-badge {
  left: 20px;
  bottom: 8px;
}

/* 评论图标 */
.icon-container .comment-icon {
  background-image: url("../../assets/img/LuWeiWei/msg_0.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}

/* 评论角标 */
.icon-container .comment-icon .el-badge {
  left: 20px;
  bottom: 10px;
}

/* 点赞图标 */
.icon-container .good-icon {
  background-image: url("../../assets/img/LuWeiWei/赞.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}

/* 点赞计数角标 */
.icon-container .good-icon .el-badge {
  left: 20px;
  bottom: 10px;
}

/* 收藏图标 */
.icon-container .like-icon {
  background-image: url("../../assets/img/LuWeiWei/like.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}

/* 收藏数量角标 */
.icon-container .like-icon .el-badge {
  left: 20px;
  bottom: 10px;
}

/* 作品名称 */
.pic-name {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  color: #333333;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin: 8px 0 8px 0;
}

/* 卡片底部信息 */
.tag-gap {
  margin: 0 5px 0 5px;
}

.card-bottom-msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-bottom-msg .writer-msg {
  width: 200px;
  height: 32px;
}
.card-bottom-msg .writer-msg {
  width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.card-bottom-msg .writer-msg span {
  
  height: 32px;
  line-height: 32px;
}

.card-bottom-msg .writer-msg span a img {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: top;
}
</style>