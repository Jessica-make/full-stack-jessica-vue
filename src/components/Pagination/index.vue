<template>
  <div class="pagination-container">
    <!-- background属性 会让 pager的数字的背景成方块-->
    <!-- currentPage 等于 pageNum -->
    <el-pagination 
    :background="background"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :total="total"
    :layout="layout"
    :page-sizes="pageSizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    total:{
      type:Number,
      require:true
    },
    layout:{
      type:String,
      default:'total,sizes, prev, pager, next, jumper'
    },
    background:{
      type:Boolean,
      default:true
    },
    pageSizes:{
      type:Array,
      default(){
        return [10,20,30,50]
      }
    },
    //第几页
    page:{
      type:Number,
      default:2
    },
    //一页多少条
    limit:{
      type:Number,
      default:20
    }
  },
  computed:{
    //currentPage 等于 pageNum
    currentPage:{
      get(){
        return this.page
      },
      set(val){
        this.$emit('update:page',val)
      }
    },
    pageSize:{
      get(){
        //limit 是外面的pageSize
        return this.limit
      },
      set(val){
        console.log('val ',val);
         this.$emit('update:limit',val)   
      }
    }
  },
  methods:{
    handleSizeChange(val){
      this.$emit('pagination',{
        page:this.currentPage,
        limit:val
      })
    },
    handleCurrentChange(val){
      this.$emit('pagination',{
        page:this.currentPage,
        limit:val
      })
    }
  }
};
</script>

<style scoped lang="scss">
.pagination-container {
  padding: 32px 16px;
}
</style>