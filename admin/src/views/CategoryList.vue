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
          <el-button type="danger" size="small"
            @click="deleteRow()"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
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
    async deleteRow(){
        
    }
  }
};
</script>

<style>
</style>