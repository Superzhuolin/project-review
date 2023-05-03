<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
        <!-- 标题 -->
        <div class="modal-header">
          <span>{{title}}</span>
          <!-- 关闭按钮 -->
          <a href="javasrcipt:;" class="icon-close" @click='$emit("cancel")'></a>
        </div>
        <!-- 表体   由子组件传入 -->
        <div class="modal-body">
            <slot name="body"></slot>
        </div>
        <!-- 按钮 -->
        <div class="modal-footer">
            <a href="javasrcipt:;" class="btn" v-if="btnType==1" @click='$emit("submit")'>{{sureText}}</a>
            <a href="javasrcipt:;" class="btn" v-if="btnType==2" @click='$emit("cancel")'>{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==3">
            <a href="javasrcipt:;" class="btn" @click='$emit("submit")'>{{sureText}}</a>
            <a href="javasrcipt:;" class="btn btn-default" @click='$emit("cancel")'>{{cancelText}}</a>
          </div>
        </div>
      </div>
   </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 弹框类型:小small 中middle 大large 表单form
    modalType: {
      type: String,
      default: "form",
    },
    // 弹框标题
    title: String,
    //按钮类型: 1.确定按钮  2.取消按钮  3.确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      tyoe: String,
      default: "取消",
    },
    showModal: Boolean,
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
</style>
