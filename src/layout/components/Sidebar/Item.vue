<script>
export default {
    name:'MenuItem',
    functional:true,
    props:{
        icon:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    render(h,context){
        //把props中接收到的参数 取出来
        const {icon,title}=context.props
        const vnode=[]

        if(icon){
            vnode.push(<svg-icon icon-class={icon}></svg-icon>)
        }

        if(title){
            vnode.push(<span>{(title)}</span>)
        }
        return vnode
    }
}
</script>