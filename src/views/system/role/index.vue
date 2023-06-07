<template>
  <div class="app-container">
    <el-form :inline="true" ref="queryForm" :model="queryParams">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          size="small"
          style="width: 240px"
        >
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button type="primary" size="mini" plain icon="el-icon-plus"
           @click='handleAdd()'
            >新增</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="success" size="mini" plain icon="el-icon-edit"
            :disabled="single"
            @click='handleUpdate'>修改</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="danger" size="mini" plain icon="el-icon-delete"
           :disabled="emptyId"
           @click="handleDelete"
            >删除</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="warning" size="mini" plain icon="el-icon-download"
            >导出</el-button
          >
        </el-col>

        <right-tool-bar></right-tool-bar>
      </el-row>

      <el-table :data="roleList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="角色编号" prop="roleId" width="120"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="150"></el-table-column>
        <el-table-column label="权限字符" prop="roleKey" width="150"></el-table-column>
        <el-table-column label="显示顺序" prop="roleSort" width="100"></el-table-column>
        <el-table-column label="状态" prop="status" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">
                  修改
              </el-button>

              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">
                  删除
              </el-button>

              <el-dropdown size="mini" type="text" icon="el-icon-edit">
                 <span class="el-dropdown-link">
                    <i class="el-icon-d-arrow-right"></i>更多
                 </span>
                 <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-circle-check">数据权限</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-user">分配用户</el-dropdown-item>
                 </el-dropdown-menu>
              </el-dropdown>
            </template>
        </el-table-column>
      </el-table>

      <!-- main.js 全局挂载了这个组件 -->
      <pagination 
      :total="total" 
      :pageSizes="[2,3,5,10]"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      @pagination="getList"
      >
      </pagination>


      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form label-width="100px" :model="form" ref="addForm" :rules="rules">
           <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入角色名称" v-model="form.roleName"/>
           </el-form-item>

           <el-form-item prop="roleKey">
              <span slot="label">
                <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                   <i class="el-icon-question"></i>
                </el-tooltip>
                权限字符
              </span>
              <el-input placeholder="请输入权限字符" v-model="form.roleKey"/>
           </el-form-item>

           <el-form-item label="角色顺序" prop="roleSort">
              <el-input-number controls-position="right" :min="0" v-model="form.roleSort"/>
           </el-form-item>

           <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                   <el-radio v-for="dic in dict.type.sys_normal_disable" 
                   :key="dic.value" :label="dic.value"
                   >
                      {{ dic.label }}
                   </el-radio>
                </el-radio-group>
           </el-form-item>

           <el-form-item label="菜单权限">
               <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event,'menu')">展开/折叠</el-checkbox>
               <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event,'menu')">全选/全不选</el-checkbox>
               <el-checkbox v-model="menuCheckStrictly" @change="handleCheckedTreeConnect($event,'menu')">父子联动</el-checkbox>
                <el-tree 
                 :data="menuOptions"
                 show-checkbox
                class="tree-border" 
                ref="menu"
                node-key="id"
                empty-text="加载中,请稍候"
                :check-strictly="!menuCheckStrictly"
                >
                </el-tree>
           </el-form-item>

           <el-form-item label="备注" prop="remark">
             <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"/>
           </el-form-item>
        </el-form>

         <div slot="footer">
            <el-button type="primary" @click='submitForm'>确认</el-button>
            <el-button @click='cancel'>取消</el-button>
         </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import {listRole ,addRole, getRole, updateRole,delRole} from '@/api/system/role'
import {treeselect as MenuTreeSelect,roleMenuTreeSelect} from '@/api/system/menu'

export default {
  name: "Role",
  dicts:['sys_normal_disable'],
  data() {
    return {
      dateRange: [],
      queryParams: {
        pageNum: 1, //默认查询第几页
        pageSize: 10, //默认查询1页多少条
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
      },
      roleList: [],
      total:0,
      title:'',
      open:false,
      form:{},
      rules:{
        roleName: [
          {required: true,message:'角色名称不能为空',trigger:"blur"}
        ],
        roleKey: [
          {required: true,message: "权限字符不能为空",trigger: "blur" }
        ],
        roleSort: [
          {required: true,message: "角色排序不能为空",trigger: "blur" }
        ],
      },
      menuOptions:[],
      menuExpand:false,
      menuNodeAll:false,
      menuCheckStrictly:false,
      ids:[],
      single:true,
      emptyId:true
    };
  },
  created(){
    this.getList()
  },
  methods: {
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.dateRange=[]
      this.resetForm('queryForm')
      this.handleQuery()
    },
    getList(){
      listRole(this.addDateRange(this.queryParams,this.dateRange)).then(res=>{
        this.roleList=res.rows;
        this.total=res.total
      })
    },
    handleAdd(){
      this.reset()
      this.getMenuTreeSelect()
      this.open=true
      this.title='新增角色'
    },
    handleUpdate(row){
      this.reset()
      const roleId=row.roleId || this.ids

      //获取初始菜单
      const roleMenu=this.getRoleMenuTreeSelect(roleId)

      //获取角色信息
      getRole(roleId).then(response=>{
           this.form=response.data
           this.open=true

           roleMenu.then(res=>{
            let checkedkeys=res.checkedKeys
            checkedkeys.forEach(v=>{
              //第一个参数，key值
              //第二个参数，是不是需要选中
              //第三个参数，是不是需要递归子节点
              this.$refs.menu.setChecked(v,true,false)
            })
           })
      })

    },
    handleDelete(row){
      const roleIdS=row.roleId || this.ids
      this.$model.confirm(`是否确认删除角色编号为${roleIdS}的数据`).then(()=>{
        return delRole(roleIdS)
      }).then(()=>{
         this.getList()
         this.$model.msgSuccess('删除成功')
      }).catch(()=>{})
    },
    getRoleMenuTreeSelect(roleId){
      return roleMenuTreeSelect(roleId).then(res=>{
        //获取修改的初始菜单
          this.menuOptions=res.menus
          return res
      })
    },
    cancel(){
      this.reset()
      this.open=false
    },
    submitForm(){
      this.$refs['addForm'].validate(valid=>{
          if(valid){
            this.form.menuIds=this.getMenuAllCheckedKeys()

            //如果角色Id不为空，说明这是修改
            if(this.form.roleId !==undefined){
              updateRole(this.form).then(res=>{
                this.$model.msgSuccess('修改成功')
                this.open=false
                this.getList()
              })

            }else{
              addRole(this.form).then(res=>{
                this.$model.msgSuccess('新增成功')
                this.open=false
                this.getList()
              })
            }

          }
      })
    },
    reset(){
     this.menuExpand=false,
     this.menuNodeAll=false,
     this.menuCheckStrictly=true,
     this.form={
       menuIds:[],
       roleSort:0,
       status:'0'
     }

      this.resetForm('addForm')
    },
    getMenuTreeSelect(){
      MenuTreeSelect().then(res=>{
        this.menuOptions=res.data
      })
    },
    handleCheckedTreeExpand(val,type){
       if(type === 'menu'){
          let treeList=this.menuOptions
          for (let i=0; i < treeList.length;i++){
            this.$refs.menu.store.nodesMap[treeList[i].id].expanded=val
          }
       }
    },
    handleCheckedTreeNodeAll(val,type){
        if(type === 'menu'){
          this.$refs.menu.setCheckedNodes(val ? this.menuOptions : [])
        }
    },
    handleCheckedTreeConnect(val,type){
        if(type === 'menu'){
           this.menuCheckStrictly=val
        }
    },
    getMenuAllCheckedKeys(){
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      const halfCheckedKeys=this.$refs.menu.getHalfCheckedKeys()
      return checkedKeys.concat(halfCheckedKeys).sort(function(a,b){return a-b}) 

      //  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      //  return checkedKeys
    },
    handleSelectionChange(selection){
      //修改 不等于1为true,禁用 
      this.single=selection.length !==1

      //删除 初始状态selection.length=0 false,取反为true
      //选择一个，selection.length=1 true,取反为false,可以操作
      this.emptyId=!selection.length

      this.ids=selection.map(item=>item.roleId)
      
    }
  }
};
</script>