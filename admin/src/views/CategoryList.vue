<template>
  <div class="list">
    <el-table :data="list">
      <!-- 小技巧：另一个没有加width 就默认与屏幕一样了 -->
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="open(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      returnNub: 0 // 删除返回值
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("categories");
      this.list = res.data;
      /*  拿到什么数据？
        查类别列表 -> 返回[{},{}] 格式 -> element拿到数组 ->自动循环对象中的prop="name"与_id !!厉害
    */
    },
    async delateId(id) {
      const res = await this.$http.delete(`categories/${id}`);
      this.returnNub = res.data.deletedCount; //用来判断删除了几个
      this.$message({
        type: "success",
        message: this.returnNub ? "删除成功!" : "删除失败!"
      });
      
    },
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击删除后根据返回值判断是否删除成功
          this.delateId(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>