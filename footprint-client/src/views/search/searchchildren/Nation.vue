<template>
  <div class="nation">
    <div class="select-nation">
      <span>按国别查询：</span>
    </div>
    <div class="nation-item">
      <ul class="nation-val">
        <li>中国</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nation {
  display: flex;
  justify-content: flex-start;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
.nation::after {
  content: "";
  display: block;
  clear: both;
}
.nation .select-nation {
  float: left;
  height: 24px;
  width: 100px;
  margin: 5px 0 3px 15px;
  font-size: 13px;
  text-align: right;
}
.nation .nation-item {
  width: 1000px;
  float: left;
}
.nation-item a {
  text-decoration: none;
}
.nation .nation-item .nation-val {
  margin: 0;
  list-style: none;
  padding-left: 0px;
  font-size: 13px;
}
.nation .nation-item .nation-val .el-tag {
  height: 25px;
  line-height: 25px;
}
.nation .nation-item .nation-val li {
  display: inline-block;
   margin: 2px 4px;
  padding: 3px 10px;
  color: rgb(41, 50, 170);
  cursor: pointer;
}
.nation .nation-item .nation-val li:hover {
  background-color: rgba(81, 175, 219, 0.829);
  border-radius: 5px;
  padding: 3px 10px;
  color: #fff;
}
</style>