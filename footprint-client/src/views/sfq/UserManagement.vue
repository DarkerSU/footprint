<template>
  <div class="UserManagement">
    <div>
      <el-table :data="tableData" style="width: 100%" @select="handleSelectionChange">
        <el-table-column prop label="全选" type="selection"></el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="rnum" label="角色编号"></el-table-column>
        <el-table-column prop="rname" label="角色名称"></el-table-column>
        <el-table-column label="模块-角色授权" min-width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">模块-角色授权</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-table-column label="我的足迹">
        <el-table-column prop="addfp" label="添加足迹" width="120">
    <el-checkbox :checked="selectCheckd.checked1" @change="changeVal(1.1)"></el-checkbox>-->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <input type="checkbox"   value="1.1" @change="changeVal"/> -->
    <!-- </el-table-column>
    <el-table-column prop="myfp" label="我的足迹" width="120">-->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked2" @change="changeVal(1.2)"></el-checkbox> -->
    <!-- <input type="checkbox" value="1.2" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column label="收藏足迹"> -->
    <!-- <el-table-column prop="collfp" label="已收藏足迹" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked3" @change="changeVal(2.1)"></el-checkbox> -->
    <!-- <input type="checkbox" value="2.1" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column prop="commentfp" label="已评论足迹" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked4" @change="changeVal(2.2)"></el-checkbox> -->
    <!-- <input type="checkbox" value="2.2" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column label="主题设置"> -->
    <!-- <el-table-column prop="themefp" label="选择主题"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked5" @change="changeVal(3.1)"></el-checkbox> -->
    <!-- <input type="checkbox" value="3.1" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column label="用户管理"> -->
    <!-- <el-table-column prop="tablefp" label="用户列表" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked6" @change="changeVal(4.1)"></el-checkbox> -->
    <!-- <input type="checkbox" value="4.1" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column prop="limitfp" label="用户授权" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked7" @change="changeVal(4.2)"></el-checkbox> -->
    <!-- <input type="checkbox" value="4.2" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column label="设置"> -->
    <!-- <el-table-column prop="perfp" label="个人资料" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked8" @change="changeVal(5.1)"></el-checkbox> -->
    <!-- <input type="checkbox" value="5.1" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- <el-table-column prop="pwdfp" label="设置密码" width="120"> -->
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-checkbox :checked="selectCheckd.checked9" @change="changeVal(5.2)"></el-checkbox> -->
    <!-- <input type="checkbox" value="5.2" @change="changeVal" /> -->
    <!-- </el-table-column> -->
    <!-- </el-table-column> -->

    <el-dialog title="模块-角色授权" :visible.sync="model_role" class="model-role">
      <el-form>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="用户账号:" :label-width="formLabelWidth">
                  <el-input v-model="rowRole.rnum" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="昵称:" :label-width="formLabelWidth">
                  <el-input v-model="rowRole.rname" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <!--  -->
          <div class="fpmodel" v-for="(item,index) of fpmodel" :key="index">
            <el-checkbox
              :indeterminate="item.isIndeterminate"    
              v-model="item.checkAll"
              @change="handleCheckAllChange"
            >{{item.name}}</el-checkbox>
            <!-- <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group v-model="checkedMyfp" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in item.submodel" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="model_role = false">取 消</el-button>
        <el-button type="primary" @click="modelRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// fpmodel = [
//   { name: "我的足迹", submodel: ["添加足迹", "查看足迹"] },
//   { name: "收藏足迹", submodel: ["已收藏足迹", "已评论足迹"] },
//   { name: "主体设置", submodel: ["选择主体"] },
//   { name: "用户管理", submodel: ["用户列表", "角色授权"] },
//   { name: "设置", submodel: ["修改信息", "修改密码"] }
// ];
// const fpmodel = ["我的足迹", "收藏足迹", "主体设置", "用户管理", "设置"];
const fpmodel1 = ["添加足迹", "查看足迹"]; /* 模块名称 */
// const fpmodel2 = ["已收藏足迹", "已评论足迹"];
// const fpmodel3 = ["选择主体"];
// const fpmodel4 = ["用户列表", "角色授权"];
// const fpmodel5 = ["修改信息", "修改密码"];
export default {
  data() {
    return {
      model_role: false,
      tableData: [],
      rowRole: {},
      formLabelWidth: "100px",

      fpmodel: [
        { name: "我的足迹",checkAll:false,isIndeterminate:true, submodel: ["添加足迹", "查看足迹"],checkedMyfp:[] },
        { name: "收藏足迹",checkAll:false,isIndeterminate:true, submodel: ["已收藏足迹", "已评论足迹"],checkedMyfp:[] },
        { name: "主体设置",checkAll:false,isIndeterminate:true, submodel: ["选择主体"],checkedMyfp:[] },
        { name: "用户管理",checkAll:false,isIndeterminate:true, submodel: ["用户列表", "角色授权"],checkedMyfp:[] },
        { name: "设置",checkAll:false,isIndeterminate:true, submodel: ["修改信息", "修改密码"],checkedMyfp:[] }
      ],
      
      // 弹框中多选框相关属性
      checkAll: false /* 全选状态 */,
      checkedMyfp: [] /* 选择的模块名 */,
      myfp: fpmodel1 /* 模块子级名称 */,
      isIndeterminate: true

      // addfp: 1.1,
      // myfp: 1.2,
      // collfp: 2.1,
      // commentfp: 2.2,
      // themefp: 3.1,
      // tablefp: 4.1,
      // limitfp: 4.2,
      // perfp: 5.1,
      // pwdfp: 5.2
    };
  },
  methods: {
    //多选框
    handleCheckAllChange(val) {
      this.checkedMyfp = val
        ? fpmodel1
        : []; /* 当val为true时，带表全选，则选择的模块为所有模块 */
      this.isIndeterminate = false;
      console.log(val);
      console.log(this.fpmodel);
    },
    handleCheckedCitiesChange(value) {
      console.log(value); /* value选择的模块名称数组 */
      //  console.log( this.checkedCities);
      let checkedCount = value.length;
      this.checkAll =
        checkedCount ===
        this.myfp
          .length; /*当checkedCount与 this.myfp.length长度一致，说明全选，即为真*/
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount <
          this.myfp
            .length; /*checkedCount > 0 ，checkedCount < this.myfp.length说明有至少一个选项被选择，*/
    },
    // 模块-角色授权模式
    handleEdit(index, row) {
       this.$alert(
            "此模块暂未对您开放",
            "消息",
            {
              confirmButtonText: "确定"
            }
          );
      // this.model_role = true;
      // console.log(index, row);
      this.rowRole = row;
    },
    // 删除角色
    handleDelete(index, row) {
       this.$alert(
            "您暂无此权限",
            "消息",
            {
              confirmButtonText: "确定"
            }
          );
      // console.log(index, row);
    },
    modelRole() {},
    getuser() {
      this.axios.get("/role").then(res => {
        // console.log(res.data.data);
        var data1 = res.data.data;

        // for (var i = 0; i < data1.length; i++) {
        // data1[i].addfp = 1.1;
        // data1[i].myfp = 1.2;
        // data1[i].collfp = 2.1;
        // data1[i].commentfp = 2.2;
        // data1[i].themefp = 3.1;
        // data1[i].tablefp = 4.1;
        // data1[i].limitfp = 4.2;
        // data1[i].perfp = 5.1;
        // data1[i].pwdfp = 5.2;
        // }
        this.tableData = data1;
        // delete
        // xconsole.log(this.tableData);
      });
    },
    handleSelectionChange(selection, row) {
      console.log(selection);

      console.log(row);
    }
  },

  created() {
    this.getuser();
  }
};
</script>

<style>
.UserManagement .cell {
  text-align: center;
}
.model-role .el-dialog {
  width: 600px !important;
}
.model-role .el-dialog .el-dialog__header {
  border-bottom: 1px solid #e6e6e6;
}
.model-role .fpmodel{
  padding:5px 35px;
}
</style>