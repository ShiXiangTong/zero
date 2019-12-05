<template>
  <div class="about">
    <h1>{{ id?'编辑':'创建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 这里为什么用.native？ .prevent阻止表单跳转链接 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [] //父级的选项
    };
  },

  created() {
    this.id && this.CategoryName(); //先判断有无id，有则查
    this.CategoryParents();
  },

  methods: {
    //创建分类 返回的是一个promise,就可以用asyuc变为同步
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
        this.$router.push("/categories/list");
        this.$message({
          type: "success",
          message: "编辑成功"
        });
      } else {
        res = await this.$http.post("categories", this.model);
        //得到res，跳转的分类列表
        this.$router.push("/categories/list");
        //跳转的时候还应该提示一下保存成功 （element-ui提供的方法）
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
    // 初始时就根据id查询分类名称
    async CategoryName() {
      let res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    // 初始时获取所有的父级分类
    async CategoryParents() {
      const res = await this.$http.get("categories");
      this.parents = res.data;
    }
  }
};
</script>

<style>
/* CategoryEdit  类别创建/编辑 */
</style>