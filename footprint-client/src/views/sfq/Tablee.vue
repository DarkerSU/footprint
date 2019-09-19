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
        <el-table-column prop="uname" label="用户姓名"></el-table-column>
        <el-table-column prop="uphone" label="用户电话"></el-table-column>
        <el-table-column prop="uEmail" label="用户邮箱"></el-table-column>
        <el-table-column prop="uscore" label="用户积分"></el-table-column>
        <el-table-column prop="urole" label="用户角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="3"  @current-change="getuser"  :current-page.sync="currentPage"></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      total:0,
      currentPage:1
    };
  },

  methods: {
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
      if(!pno){
        pno=1
      }
      console.log(pno);
      var count=3;
      this.axios.get("/user/page", {params:{pno,count}}).then(res => {
        // console.log(res.data.sum) 
        this.tableData = res.data.data;
        this.total=res.data.sum;
        // console.log(this.total)
      });
    },
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
</style>