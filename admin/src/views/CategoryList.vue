<template>
  <div class="list">
    <el-table :data="list">
      <!-- 小技巧：另一个没有加width 就默认与屏幕一样了 -->
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="delateId(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //provide/inject依赖注入需要了解！
  data() {
    return {
      list: [],
      returnNub: 0 //删除返回值
    };
  },
  created() {
    this.fetch(); //获取数据
  },
  methods: {
    //获取分类列表
    async fetch() {
      const res = await this.$http.get("categories");
      this.list = res.data;
      /*  拿到什么数据？
        查类别列表 -> 返回[{},{}] 格式 -> element拿到数组 ->自动循环对象中的prop="name"与_id。
      */
    },
    //删除分类
    delateId(row) {
      this.$confirm(`是否删除【${ row.name }】分类？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`categories/${row._id}`);
        this.returnNub = res.data.deletedCount; //用来判断删除了几个(其实id只有一个)
        this.$message({
          type: "success",
          message: this.returnNub ? "删除成功!" : "删除失败!"
        });
        this.reload(); //1.控制router-view显示隐藏达到刷新效果。
        //this.fetch();  2.直接获取数据。
      });
    }
  }
};
</script>

<style>
</style>