<template>
    <div class="ali-c jus-c" style="height:100vh">
            <div class="ali-c flexv">
                <h3 style="margin-bottom:40px">糟糕！</h3>


                <el-button type="primary" round @click="to">返回首页</el-button>
            </div>
    </div>
</template>
<script>
export default {
    methods:{
        to(){
            this.$router.push({path:'/'})
        }
    }
}
</script>