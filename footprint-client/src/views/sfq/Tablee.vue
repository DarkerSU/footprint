<template>
  <div class="user-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange()"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="unum" label="用户账号"></el-table-column>
      <el-table-column prop="uname" label="昵称"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="uphone" label="联系电话"></el-table-column>
      <el-table-column prop="uEmail" label="电子邮箱"></el-table-column>
      <el-table-column prop="uscore" label="用户积分"></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="userpage">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="count"
        @current-change="getuser"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>

    <!-- 用户信息编辑页，及用户授权 -->
    <el-dialog title="修改用户信息" :visible.sync="editUserdialogVisible" class="editUserInfodialog">
      <el-form>
        <!-- 用户编号 -->
        <el-form-item label="编号:" :label-width="formLabelWidth">
          <el-input v-model="UserInfo.uid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="用户账号:" :label-width="formLabelWidth">
                  <el-input v-model="UserInfo.unum" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-form-item label="昵称:" :label-width="formLabelWidth">
                  <el-input
                    v-model="UserInfo.uname"
                    auto-complete="off"
                    :disabled=" UserInfo.urole==3?false:true"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-radio-group v-model="UserInfo.ugender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="联系电话:" :label-width="formLabelWidth">
                <el-input v-model="UserInfo.uphone" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="电子邮箱:" :label-width="formLabelWidth">
                <el-input v-model="UserInfo.uEmail" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="头像:" :label-width="formLabelWidth">
          <div class="dialogUserPic">
            <img :src="UserInfo.upic" alt />
          </div>

          <!-- <el-input v-model="UserInfo.upic" auto-complete="off" :disabled="true"></el-input> -->
        </el-form-item>

        <el-form-item label="用户积分:" :label-width="formLabelWidth">
          <el-input v-model="UserInfo.uscore" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色分配:" :label-width="formLabelWidth">
          <!-- <el-input v-model="UserInfo.urole" auto-complete="off"></el-input> -->
          <el-select v-model="UserInfo.urole" placeholder="请选择">
            <el-option
              v-for="item in uroleGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="UserInfo.utext"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="editUserdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject:['reload'], /* 注入reload方法 */
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      total: 0,
      currentPage: 1,
      count: 5,
      UserInfo: {}, //勾选的用户信息
      editUserdialogVisible: false,
      formLabelWidth: "100px",
      uroleGroup: [
        {
          value: 0,
          label: "普通用户"
        },
        {
          value: 1,
          label: "VIP用户"
        },
        {
          value: 2,
          label: "管理员"
        },
        {
          value: 3,
          label: "高级管理员",
          disabled: true
        }
      ]
    };
  },

  methods: {
    // 修改用户信息
    handleEdit(index, row) {
      this.editUserdialogVisible = true;
      delete row.sex;  /* 删除添加的sex属性 */
      this.UserInfo = row;
    },
    // 删除用户
    handleDelete(row) {
      // console.log(JSON.parse(sessionStorage.getItem("UserInfo")));
      // console.log(row)
      var sessionInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      if (sessionInfo.urole == 2) {
        if (row.urole>=sessionInfo.urole ) {
          this.$alert(
            "您暂时没有对此用户的操作权限，请联系高级管理员",
            "警告",
            {
              confirmButtonText: "确定"
            }
          );
        } else {
          this.$confirm("此操作将永久修改用户信息，是否继续修改？", "提示", {
            confirmButtonText: "确定修改",
            cancelButtonText: "取消修改"
          })
            .then(() => {
              var data = this.UserInfo;
              var unum = row.unum;
              this.axios
                .delete("/user/deleteUser", {
                  params: {
                    unum: unum
                  }
                })
                .then(res => {
                  if (res.data.code == 1) {
                    this.$message({
                      message: "成功删除该用户",
                      type: "success"
                    });
                    this.reload();    /* 此方法是在persional组件中注入的，用于刷新页面 */
                  } else {
                    this.$message.error("用户信息删除失败");
                  }
                });
            })
            .catch(() => {
              this.$message("已取消修改");
            });
        }
      } else {
        this.$alert("您无此权限，只有管理员权限才可以做此操作", "警告", {
          confirmButtonText: "确定"
        });
      }
    },
    // 确认提交休息用户信息
    submit() {
      this.$confirm("此操作将永久修改用户信息，是否继续修改？", "提示", {
        confirmButtonText: "确定修改",
        cancelButtonText: "取消修改"
      })
        .then(() => {
          var data = this.UserInfo;
          this.axios
            .post("/user/updateuserinfo", this.qs.stringify(data))
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  message: "用户信息成功",
                  type: "success"
                });
               this.reload();    /* 此方法是在persional组件中注入的，用于刷新页面 */
              } else {
                this.$message.error("用户信息修改失败");
              }
            });
        })
        .catch(() => {
          this.$message("已取消修改");
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getuser(pno) {
      // pno=1;
      if (!pno) {
        pno = 1;
      }
      // console.log(pno);
      var count = this.count;
      this.axios.get("/user/page", { params: { pno, count } }).then(res => {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].ugender == 1) {
            res.data.data[i].sex = "男";
          } else if (res.data.data[i].ugender == 0) {
            res.data.data[i].sex = "女";
          } else {
            res.data.data[i].sex = "";
          }
        }
        this.tableData = res.data.data;
        console.log(this.tableData)
        this.total = res.data.sum;
      });
    }
  },
  created() {
    this.getuser();
  }
};
</script>

<style>
.user-list .el-table td,
.user-list .el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center !important;
}
.userpage {
  text-align: center;
  margin: 20px 0;
}
.editUserInfodialog .el-form-item {
  margin-bottom: 13px;
}
.editUserInfodialog .el-dialog {
  width: 670px !important;
}
.editUserInfodialog .el-dialog .el-dialog__body {
  padding-right: 60px;
}
.editUserInfodialog .el-input__inner {
  min-width: 100%;
}
.editUserInfodialog .dialogUserPic {
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  width: 130px;
  height: 130px;
}
.editUserInfodialog .dialogUserPic img {
  width: 100%;
  height: 100%;
}
</style>