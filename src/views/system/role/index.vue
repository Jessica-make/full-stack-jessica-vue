<template>
    <div class="app-container">
        <el-form :inline="true">
            <el-form-item label="角色名称">
                <el-input v-model="queryParams.roleName"
                 placeholder="请输入角色名称"
                 size="small"
                 style="width: 240px;"
                />
            </el-form-item>

            <el-form-item label="权限字符">
                <el-input v-model="queryParams.roleKey" 
                 placeholder="请输入权限字符"
                 size="small"
                 style="width: 240px;"
                />
            </el-form-item>

            <el-form-item label="状态">
                <el-select v-model="queryParams.status" 
                 size="small"
                 style="width: 240px;"
                >
                </el-select>
            </el-form-item>

            <el-form-item label="创建时间">
                <el-date-picker 
                v-model="dateRange" 
                size="small"
                style="width: 240px;"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item>
             <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
             <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
           </el-form-item>

           <el-row :gutter="10">
              <el-col :span="1.5">
                 <el-button type="primary" size="mini" plain icon="el-icon-plus">新增</el-button>
              </el-col>

              <el-col :span="1.5">
                <el-button type="success" size="mini" plain icon="el-icon-edit">修改</el-button>
              </el-col>

              <el-col :span="1.5">
                 <el-button type="danger" size="mini" plain icon="el-icon-delete">删除</el-button>
              </el-col>

              <el-col :span="1.5">
                <el-button type="warning" size="mini" plain icon="el-icon-download">导出</el-button>
              </el-col>

              <right-tool-bar></right-tool-bar>
           </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    name:'Role',
    data(){
        return {
            dateRange:[],
            queryParams:{
                roleName:undefined,
                roleKey:undefined,
                status:undefined
            
            }
        }
    }
}
</script>